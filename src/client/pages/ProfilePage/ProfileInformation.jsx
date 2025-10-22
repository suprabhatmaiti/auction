import Input from "../../components/Input/Input";

function ProfileInformation(){
    return(
         <div className="w-full px-4">
              <h2 className="text-lg md:text-xl font-bold mb-4 text-slate-700">Contact Information</h2>

              <div className="md:flex gap-4 w-full md:mb-12 mb-8">
                <div className="flex flex-col w-full mb-4 md:mb-0">
                  <Input type='text' label='Email' />
                </div>
                <div className="flex flex-col w-full">
                  <Input type='text' label='Phone Number' />
                </div>
              </div>

              <div className="border-b border-gray-400 pb-8">
                  <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                    <div className="md:flex gap-4 w-full mb-4">
                      <div className="flex flex-col w-full ">
                        <Input label='Full Name' type='text' />
                      </div>
                      <div className="flex flex-col w-full">
                        <Input label='User Name ' type='text' />
                      </div>
                    </div>
                    <div className="md:flex gap-4 w-full">
                      <div className="flex flex-col w-full">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                        <input type="date" name="DOB" id="DOB" className="bg-gray-100 rounded h-8 w-full focus:outline-none px-3" />
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                        <select className="bg-gray-100 rounded h-8 w-full focus:outline-none px-3">
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
              </div>
              <div className="flex gap-4 my-4 md:justify-end">
                  <button className="bg-white hover:bg-gray-100 text-violet-600 md:px-6 px-2 md:py-3 py-1 text-sm md:text-base rounded-lg font-semibold shadow-md transition">
                      Cancel
                  </button>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white text-sm md:text-base md:px-6 px-2 md:py-3 py-1 rounded-lg font-semibold transition">
                      Save Changes
                  </button>
              </div>
            </div>
    )
}

export default ProfileInformation;