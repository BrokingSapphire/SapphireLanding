
const LocationSection = () => {
  return (
    <div className="relative mx-auto w-full bg-gray-50 py-12 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-5xl text-center font-bold  leading-tight">
          Your trusted broking partner, <br /> just a step away.
        </h2>

        {/* Image and Info */}
        <div className="relative mt-6 w-full mx-auto flex justify-center items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3721.469953238539!2d79.08735277525949!3d21.133687980542135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA4JzAxLjMiTiA3OcKwMDUnMjMuNyJF!5e0!3m2!1sen!2sin!4v1742067161508!5m2!1sen!2sin"
            width="1000"
            height="500"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
