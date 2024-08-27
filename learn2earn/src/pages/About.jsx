import Navbar from "../components/Navbar";

function About({ isAuth, name }) {
  return (
    <>
      <Navbar isAuth={isAuth} name={name} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-center mb-4">
            About Learn2Earn
          </h2>
          <p className="text-gray-600 text-center">
            Learn2Earn is an innovative book trading platform. Our vision is to
            create a world where all people can share their unique taste and
            knowledge without limitation. Our platform is made for book-worms,
            knowledge enthusiasts and everyone in between! Sign up to join our
            cause!
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
