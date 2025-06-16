import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define checkpoint steps that exist in your backend API
export enum CheckpointStep {
  PAN = 'pan',
  AADHAAR = 'aadhaar',
  INVESTMENT_SEGMENT = 'investment_segment',
  USER_DETAIL = 'user_detail',
  PERSONAL_DETAIL = 'personal_detail',
  OTHER_DETAIL = 'other_detail',
  BANK_VALIDATION = 'bank_validation',
  IPV = 'ipv',
  SIGNATURE = 'signature',
  ADD_NOMINEES = 'add_nominees',
  ESIGN = 'esign',
  PASSWORD_SETUP = 'password_setup', // Added
  MPIN_SETUP = 'mpin_setup' // Added
}

// All steps in your flow (including non-API steps)
export enum AllSteps {
  EMAIL = 'email',
  MOBILE = 'mobile',
  PAN = 'pan',
  AADHAAR = 'aadhaar',
  INVESTMENT_SEGMENT = 'investment_segment',
  USER_DETAIL = 'user_detail',
  PERSONAL_DETAIL = 'personal_detail',
  OTHER_DETAIL = 'other_detail',
  BANK_VALIDATION = 'bank_validation',
  IPV = 'ipv',
  SIGNATURE = 'signature',
  ADD_NOMINEES = 'add_nominees',
  LAST_STEP = 'last_step', // This is where eSign happens
  SET_PASSWORD = 'set_password',
  MPIN = 'mpin',
  CONGRATULATIONS = 'congratulations'
}

// Component mapping to steps - this maps all steps to your component order
export const STEP_TO_COMPONENT_INDEX = {
  [AllSteps.EMAIL]: 0,
  [AllSteps.MOBILE]: 1,
  [AllSteps.PAN]: 2,
  [AllSteps.AADHAAR]: 3,
  [AllSteps.INVESTMENT_SEGMENT]: 4,
  [AllSteps.USER_DETAIL]: 5,
  [AllSteps.PERSONAL_DETAIL]: 6,
  [AllSteps.OTHER_DETAIL]: 7,
  [AllSteps.BANK_VALIDATION]: 8,
  [AllSteps.IPV]: 9,
  [AllSteps.SIGNATURE]: 10,
  [AllSteps.ADD_NOMINEES]: 11,
  [AllSteps.LAST_STEP]: 12, // eSign happens here
  [AllSteps.SET_PASSWORD]: 13, // Password setup
  [AllSteps.MPIN]: 14, // MPIN setup
  [AllSteps.CONGRATULATIONS]: 15,
} as const;

// Define the order of steps to check (only API-backed steps)
const API_STEP_ORDER = [
  CheckpointStep.PAN,
  CheckpointStep.AADHAAR,
  CheckpointStep.INVESTMENT_SEGMENT,
  CheckpointStep.USER_DETAIL,
  CheckpointStep.PERSONAL_DETAIL,
  CheckpointStep.OTHER_DETAIL,
  CheckpointStep.BANK_VALIDATION,
  CheckpointStep.IPV,
  CheckpointStep.SIGNATURE,
  CheckpointStep.ADD_NOMINEES,
  CheckpointStep.ESIGN,
  CheckpointStep.PASSWORD_SETUP, // Added
  CheckpointStep.MPIN_SETUP, // Added
];

interface CheckpointData {
  step: CheckpointStep;
  data: any;
  completed: boolean;
}

interface UseCheckpointReturn {
  checkpointData: Record<CheckpointStep, CheckpointData | null>;
  currentStep: number;
  isLoading: boolean;
  error: Error | null;
  refetchStep: (step: CheckpointStep) => void;
  invalidateAll: () => void;
  getStepData: (step: CheckpointStep) => any;
  isStepCompleted: (step: CheckpointStep) => boolean;
  isEmailCompleted: () => boolean;
  isMobileCompleted: () => boolean;
  getClientId: () => string | null; // Added to get client ID
}

// Custom hook to manage checkpoint data
export const useCheckpoint = (): UseCheckpointReturn => {
  const queryClient = useQueryClient();
  
  // Get auth token from cookies
  const getAuthToken = () => {
    return Cookies.get('authToken') || '';
  };

  // Check if email is completed (has email in localStorage)
  const isEmailCompleted = () => {
    return !!localStorage.getItem('email');
  };

  // Check if mobile is completed (has token in cookies)
  const isMobileCompleted = () => {
    return !!getAuthToken();
  };

  // Get client ID from any completed checkpoint that has it
  const getClientId = (): string | null => {
    // Try to get from PASSWORD_SETUP first (most likely to have it)
    const passwordData = checkpointData[CheckpointStep.PASSWORD_SETUP];
    if (passwordData?.data?.client_id) {
      return passwordData.data.client_id;
    }
    
    // Try MPIN_SETUP
    const mpinData = checkpointData[CheckpointStep.MPIN_SETUP];
    if (mpinData?.data?.client_id) {
      return mpinData.data.client_id;
    }
    
    // Try other steps that might have client_id
    for (const step of API_STEP_ORDER) {
      const stepData = checkpointData[step];
      if (stepData?.data?.client_id) {
        return stepData.data.client_id;
      }
    }
    
    return null;
  };

  // Function to fetch specific checkpoint step
  const fetchCheckpointStep = async (step: CheckpointStep): Promise<CheckpointData> => {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token found');

    try {
      let response;
      
      // Use specific endpoints for IPV, SIGNATURE, and ESIGN
      if (step === CheckpointStep.IPV) {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/ipv`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (step === CheckpointStep.SIGNATURE) {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/signature`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (step === CheckpointStep.ESIGN) {
        // For eSign, we need to check if esign field exists in checkpoint
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Check if esign field exists and is not null
        if (response.data?.data?.esign) {
          return {
            step,
            data: { esign: response.data.data.esign },
            completed: true,
          };
        } else {
          return {
            step,
            data: null,
            completed: false,
          };
        }
      } else if (step === CheckpointStep.PASSWORD_SETUP || step === CheckpointStep.MPIN_SETUP) {
        // Use the checkpoint endpoint for password and MPIN setup
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint/${step}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Use the general checkpoint endpoint for other steps
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint/${step}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      
      return {
        step,
        data: response.data.data,
        completed: true,
      };
    } catch (error: any) {
      if (error.response?.status === 404 || error.response?.status === 204) {
        // Step not completed yet
        return {
          step,
          data: null,
          completed: false,
        };
      }
      throw error;
    }
  };

  // Query only API-backed checkpoint steps
  const checkpointQueries = API_STEP_ORDER.map(step => 
    useQuery({
      queryKey: ['checkpoint', step],
      queryFn: () => fetchCheckpointStep(step),
      enabled: !!getAuthToken(), // Only fetch if we have a token
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 404 or 204 (step not completed)
        if (error?.response?.status === 404 || error?.response?.status === 204) {
          return false;
        }
        return failureCount < 3;
      },
    })
  );

  // Process data into a more usable format
  const checkpointData: Record<CheckpointStep, CheckpointData | null> = 
    API_STEP_ORDER.reduce((acc, step, index) => {
      const query = checkpointQueries[index];
      acc[step] = query.data || null;
      return acc;
    }, {} as Record<CheckpointStep, CheckpointData | null>);

  // Determine current step considering all steps
  const getCurrentStep = (): number => {
    // Check email completion
    if (!isEmailCompleted()) {
      return STEP_TO_COMPONENT_INDEX[AllSteps.EMAIL];
    }

    // Check mobile completion
    if (!isMobileCompleted()) {
      return STEP_TO_COMPONENT_INDEX[AllSteps.MOBILE];
    }

    // Check API-backed steps up to but not including ESIGN, PASSWORD_SETUP, MPIN_SETUP
    const preEsignSteps = [
      CheckpointStep.PAN,
      CheckpointStep.AADHAAR,
      CheckpointStep.INVESTMENT_SEGMENT,
      CheckpointStep.USER_DETAIL,
      CheckpointStep.PERSONAL_DETAIL,
      CheckpointStep.OTHER_DETAIL,
      CheckpointStep.BANK_VALIDATION,
      CheckpointStep.IPV,
      CheckpointStep.SIGNATURE,
      CheckpointStep.ADD_NOMINEES,
    ];
    
    for (const step of preEsignSteps) {
      const stepData = checkpointData[step];
      if (!stepData?.completed) {
        return STEP_TO_COMPONENT_INDEX[step as unknown as AllSteps];
      }
    }

    // If all pre-eSign steps are completed, check eSign
    const esignData = checkpointData[CheckpointStep.ESIGN];
    if (!esignData?.completed) {
      // eSign happens in LAST_STEP component
      return STEP_TO_COMPONENT_INDEX[AllSteps.LAST_STEP];
    }

    // If eSign is completed, check password setup
    const passwordData = checkpointData[CheckpointStep.PASSWORD_SETUP];
    if (!passwordData?.completed) {
      return STEP_TO_COMPONENT_INDEX[AllSteps.SET_PASSWORD];
    }

    // If password is completed, check MPIN setup
    const mpinData = checkpointData[CheckpointStep.MPIN_SETUP];
    if (!mpinData?.completed) {
      return STEP_TO_COMPONENT_INDEX[AllSteps.MPIN];
    }

    // If everything is completed, go to congratulations
    return STEP_TO_COMPONENT_INDEX[AllSteps.CONGRATULATIONS];
  };

  const currentComponentStep = getCurrentStep();
  const isLoading = checkpointQueries.some(query => query.isLoading);
  const error = checkpointQueries.find(query => query.error)?.error as Error | null;

  return {
    checkpointData,
    currentStep: currentComponentStep,
    isLoading,
    error,
    refetchStep: (step: CheckpointStep) => {
      queryClient.invalidateQueries({ queryKey: ['checkpoint', step] });
    },
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: ['checkpoint'] });
    },
    getStepData: (step: CheckpointStep) => checkpointData[step]?.data,
    isStepCompleted: (step: CheckpointStep) => checkpointData[step]?.completed || false,
    isEmailCompleted,
    isMobileCompleted,
    getClientId, // Added this function
  };
};

// Hook specifically for auth token management
export const useAuthToken = () => {
  const setAuthToken = (token: string) => {
    // Set in cookies with 1 day expiry
    Cookies.set('authToken', token, { expires: 1, secure: true, sameSite: 'strict' });
    // Also set in axios defaults
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const getAuthToken = () => {
    return Cookies.get('authToken');
  };

  const removeAuthToken = () => {
    Cookies.remove('authToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  return {
    setAuthToken,
    getAuthToken,
    removeAuthToken,
  };
};