import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import FormHeading from "./FormHeading";

interface LastStepPageProps {
  onNext: () => void;
}

const LastStepPage: React.FC<LastStepPageProps> = ({ onNext }) => {
  return (
    <div className="mx-auto">
      <FormHeading
        title={"Signature"}
        description={"Add your signature to complete the paperwork"}
      />
      <Button variant={"ghost"} onClick={onNext} className="py-6">
        Proceed to eSign <ChevronRight />
      </Button>
    </div>
  );
};

export default LastStepPage;
