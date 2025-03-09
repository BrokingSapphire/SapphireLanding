import React from "react";

const FormHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="text-gray-600 mb-8">{description}</p>
    </>
  );
};

export default FormHeading;
