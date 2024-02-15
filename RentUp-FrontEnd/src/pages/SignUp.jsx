import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const mybroker = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      mobileNumber: data.get('mobileNumber'),
      email: data.get('email'),
      password: data.get('password')
    };

    if(data.get('user')=== 'Broker'){
      try {
       const user = await axios.post(
        "http://localhost:8080/brokers/signup",
        mybroker
      );
      const { firstName, lastName } = user.data;
      navigate("/signup/success",{ state: { firstName, lastName } });
    } catch (error) {
      navigate("/signup/failure");
    }
    }
    else{
      try {
        const user = await axios.post(
          "http://localhost:8080/tenants/signup",
          mybroker
        );
        const { firstName, lastName } = user.data;
        navigate("/signup/success",{ state: { firstName, lastName } });
        
        navigate("/signup/success");
      } catch (error) {
        navigate("/signup/failure");
      }
      
    }

    

  }
  return (
    <>


      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-violet-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-violet-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="text"
                  required
                  placeholder="  Enter your first name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-violet-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="text"
                  required
                  placeholder="  Enter your last name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-violet-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="  Enter your email address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-violet-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="  Enter your password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-violet-900">
                Mobile number
              </label>
              <div className="mt-2">
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  inputMode="numeric"
                  required
                  placeholder="  Enter your Mobile Number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="broker" className="block text-sm font-medium leading-6 text-violet-900">
                Chosse between broker or tenant
              </label>
              <div className="flex space-between mt-2 gap-x-10">
                <div>
                  <input type="radio" id="broker" name="user" value="Broker"></input>
                  <label className="text-s" htmlFor="broker">Broker</label>
                </div>
                <div>
                  <input type="radio" id="tenant" name="user" value="Tenant"></input>
                  <label className="text-s" htmlFor="tenant">Tenant</label>
                </div>
                </div>
              </div>
              <div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp;