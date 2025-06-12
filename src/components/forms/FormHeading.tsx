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
      <h2 className=" text-3xl sm:text-2xl md:text-3xl font-lexend font-medium mb-3" dangerouslySetInnerHTML={{ __html: title }}></h2>
      <p className="   text-base sm:text-sm md:text-base text-gray-600  mb-8">{description}</p>
    </>
  );
};

export default FormHeading;
