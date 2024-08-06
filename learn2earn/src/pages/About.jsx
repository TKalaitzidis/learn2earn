import Navbar from "../components/Navbar";

function About({isAuth, name}){
    return (
        <>
            <Navbar isAuth={isAuth} name={name}/>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
                    <h2 className="text-xl font-bold text-center mb-4">About Learn2Earn</h2>
                    <p className="text-gray-600 text-center">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse rem quasi inventore provident sunt! Dolores veniam impedit vitae sit deserunt excepturi non cumque recusandae tempora laboriosam quidem, nam, error rerum.
                    </p>
                </div>
            </div>
        </>
    );
}

export default About;
