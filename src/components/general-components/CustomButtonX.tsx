import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface ButtonProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  iconBackgroundColor?: string;
  boxShadowColor?: string;
  iconBoxShadowColor?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  border?: string;
  isIconLeft?: boolean;
  className?: string;
  borderRadius?: string;
  href?: string;
  target?: string;
}

const CustomButtonX = ({
  text = "Get started",
  backgroundColor = "#a370f0",
  textColor = "white",
  iconColor = "#7b52b9",
  iconBackgroundColor = "white",
  boxShadowColor = "#714da6",
  iconBoxShadowColor = "#7b52b9",
  onClick,
  icon,
  imageSrc,
  imageAlt = "button image",
  imageWidth = 20,
  imageHeight = 20,
  border,
  isIconLeft = false,
  className = "",
  borderRadius = "9999px", // Default to rounded-full
}: ButtonProps) => {
  // Determine what to render in the icon container
  const renderIconContent = () => {
    if (icon) {
      // If icon (React component) is provided, render it
      return icon;
    } else if (imageSrc) {
      // If image source is provided, render next/image
      return (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          style={{ objectFit: "contain" }}
        />
      );
    } else {
      // Default arrow icon
      return (
        <svg
          height={24}
          width={24}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          {isIconLeft ? (
            <path
              d="M7.828 11l5.364-5.364-1.414-1.414L4 12l7.778 7.778 1.414-1.414L7.828 13H20v-2H7.828z"
              fill="currentColor"
            />
          ) : (
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            />
          )}
        </svg>
      );
    }
  };

  const buttonContent = (
    <>
      {text}
      <div className="icon">{renderIconContent()}</div>
    </>
  );

  return (
    <StyledWrapper
      $backgroundColor={backgroundColor} // Changed to $backgroundColor
      $textColor={textColor} // Changed to $textColor
      $iconColor={iconColor} // Changed to $iconColor
      $iconBackgroundColor={iconBackgroundColor} // Changed to $iconBackgroundColor
      $boxShadowColor={boxShadowColor} // Changed to $boxShadowColor
      $iconBoxShadowColor={iconBoxShadowColor} // Changed to $iconBoxShadowColor
      $border={border} // Changed to $border
      $isIconLeft={isIconLeft} // Changed to $isIconLeft
      $borderRadius={borderRadius} // Changed to $borderRadius
    >
      <button className={`cssbuttons-io-button ${className}`} onClick={onClick}>
        {buttonContent}
      </button>
    </StyledWrapper>
  );
};

interface StyledWrapperProps {
  $backgroundColor: string; // Changed to $backgroundColor
  $textColor: string; // Changed to $textColor
  $iconColor: string; // Changed to $iconColor
  $iconBackgroundColor: string; // Changed to $iconBackgroundColor
  $boxShadowColor: string; // Changed to $boxShadowColor
  $iconBoxShadowColor: string; // Changed to $iconBoxShadowColor
  $border?: string; // Changed to $border
  $isIconLeft: boolean; // Changed to $isIconLeft
  $borderRadius?: string; // Changed to $borderRadius
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  .cssbuttons-io-button {
    background: ${(props) => props.$backgroundColor};
    color: ${(props) => props.$textColor};
    font-family: inherit;
    padding: 0.35em;
    padding-left: ${(props) => (props.$isIconLeft ? "3.3em" : "1.2em")};
    padding-right: ${(props) => (props.$isIconLeft ? "1.2em" : "3.3em")};
    font-size: 17px;
    font-weight: 500;
    border-radius: ${(props) => props.$borderRadius};
    border: ${(props) => props.$border || "none"};
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em ${(props) => props.$boxShadowColor};
    overflow: hidden;
    position: relative;
    height: 2.8em;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
  }

  .cssbuttons-io-button .icon {
    background: ${(props) => props.$iconBackgroundColor};
    margin-left: ${(props) => (props.$isIconLeft ? "0" : "1em")};
    margin-right: ${(props) => (props.$isIconLeft ? "1em" : "0")};
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: ${(props) =>
      props.$borderRadius === "9999px"
        ? "50%"
        : "calc(" + props.$borderRadius + " - 0.2em)"};
    box-shadow: 0.1em 0.1em 0.6em 0.2em ${(props) => props.$iconBoxShadowColor};
    right: ${(props) => (props.$isIconLeft ? "auto" : "0.3em")};
    left: ${(props) => (props.$isIconLeft ? "0.3em" : "auto")};
    transition: all 0.3s ease-in-out;
  }

  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
    border-radius: ${(props) => props.$borderRadius};
    /* Add a slight transition delay for smoother radius change */
    transition: all 0.3s, border-radius 0.15s;
  }

  .cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: ${(props) => props.$iconColor};
  }

  .cssbuttons-io-button:hover .icon svg {
    transform: ${(props) =>
      props.$isIconLeft ? "translateX(-0.1em)" : "translateX(0.1em)"};
  }

  .cssbuttons-io-button .icon img {
    transition: transform 0.3s;
  }

  .cssbuttons-io-button:hover .icon img {
    transform: ${(props) =>
      props.$isIconLeft ? "translateX(-0.1em)" : "translateX(0.1em)"};
  }

  .cssbuttons-io-button:active .icon {
    transform: scale(0.95);
  }
`;

export default CustomButtonX;
