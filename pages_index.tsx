import React, { useState } from 'react';

interface Student {
  name: string;
  age: string;
  email: string;
}

const CoderDojoWestport: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([{ name: '', age: '', email: '' }]);
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerRole, setVolunteerRole] = useState('');
  const [volunteerSkills, setVolunteerSkills] = useState('');
  const [volunteerMessage, setVolunteerMessage] = useState('');

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

    const [blogPosts, setBlogPosts] = useState([
        { id: 1, title: "Welcome to CoderDojo Westport!", content: "We are excited to announce the launch of our CoderDojo club. Join us for our first session on March 1st!" },
        { id: 2, title: "Scratch: A Fun Way to Learn Coding", content: "Scratch is a visual programming language that makes it easy for kids to create interactive stories, games, and animations." }
    ]);

  const handleAddStudent = () => {
    setStudents([...students, { name: '', age: '', email: '' }]);
  };

  const handleStudentChange = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [field]: value };
    setStudents(updatedStudents);
  };

  const handleRemoveStudent = (index: number) => {
      const updatedStudents = [...students];
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
  }

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationMessage('');

    if (!termsAccepted) {
      setRegistrationMessage('Please accept the terms and conditions.');
      return;
    }

    // Basic validation for required fields
      if (!parentName || !parentEmail) {
          setRegistrationMessage('Please fill in all required fields.');
          return;
      }

      for (const student of students) {
          if (!student.name || !student.age || !student.email) {
              setRegistrationMessage('Please fill in all student fields.');
              return;
          }
      }

    const registrationData = {
      students,
      parentName,
      parentEmail,
      experienceLevel,
      termsAccepted,
    };

    try {
      // Replace with your actual Google Sheets API endpoint (using a service like Sheety, Apispreadsheets, or Google Apps Script)
      const response = await fetch('https://api.sheetmonkey.io/form/YOUR_SHEETMONKEY_ID', {  // Example using Sheet Monkey (replace with your chosen service)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setRegistrationMessage('Registration successful! We will contact you soon.');
        // Clear form fields
        setStudents([{ name: '', age: '', email: '' }]);
        setParentName('');
        setParentEmail('');
        setExperienceLevel('Beginner');
        setTermsAccepted(false);
      } else {
        const errorData = await response.json(); // Attempt to get error details
        setRegistrationMessage(`Registration failed: ${errorData.message || 'Please try again later.'}`);
      }
    } catch (error) {
      setRegistrationMessage('An error occurred. Please try again later.');
      console.error(error);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerMessage('');
    const volunteerData = { volunteerName, volunteerEmail, volunteerRole, volunteerSkills };

    try {
      const response = await fetch('https://api.sheetmonkey.io/form/YOUR_SHEETMONKEY_ID', { // Use a different Sheet Monkey ID if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerData),
      });

      if (response.ok) {
        setVolunteerMessage('Application submitted successfully!');
        setVolunteerName('');
        setVolunteerEmail('');
        setVolunteerRole('');
        setVolunteerSkills('');
      } else {
          const errorData = await response.json();
        setVolunteerMessage(`Application failed: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      setVolunteerMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterMessage('');

    try {
      const response = await fetch('https://api.sheetmonkey.io/form/YOUR_SHEETMONKEY_ID', { // Use a different Sheet Monkey ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        setNewsletterMessage('Subscribed to newsletter!');
        setNewsletterEmail('');
      } else {
          const errorData = await response.json();
        setNewsletterMessage(`Subscription failed: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      setNewsletterMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">CoderDojo Westport</h1>
            <p className="text-sm">Inspiring the next generation of coders</p>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-blue-200">Home</a></li>
              <li><a href="#" className="hover:text-blue-200">About</a></li>
              <li><a href="#" className="hover:text-blue-200">Programs</a></li>
              <li><a href="#" className="hover:text-blue-200">Register</a></li>
              <li><a href="#" className="hover:text-blue-200">Volunteer</a></li>
              <li><a href="#" className="hover:text-blue-200">Contact</a></li>
            </ul>
          </nav>
          <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-bold hover:bg-blue-100">
            Register Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Welcome Young Coders!</h2>
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-48 mx-auto mb-8" />
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-600">
            Join Our First Class - March 1st
          </button>
        </div>
      </section>

      {/* About CoderDojo Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">About CoderDojo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                CoderDojo is a global movement of free, volunteer-led, community-based programming clubs for young people.
                At CoderDojo, young people learn how to code, develop websites, apps, games and more.
              </p>
              <p className="text-lg mb-4">
                We welcome all skill levels, from complete beginners to advanced coders, aged 7-17.
              </p>
              <ul className="list-disc list-inside">
                <li>Learn to code</li>
                <li>Develop websites and apps</li>
                <li>Explore technology</li>
                <li>Meet new friends</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-24" />
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-24" />
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-24" />
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Learning Journey Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Our Learning Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-blue-500 mb-2">Scratch Programming</h3>
              <p className="text-gray-700 mb-2">Learn the basics of programming with Scratch, a visual programming language.</p>
              <a href="https://scratch.mit.edu/" className="text-blue-500 hover:underline">Scratch Website</a>,
              <a href="https://projects.raspberrypi.org/en/projects?software%5B%5D=scratch" className='text-blue-500 hover:underline'> Code Club Examples</a>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-blue-500 mb-2">Web Development (HTML, CSS, JS)</h3>
              <p className="text-gray-700 mb-2">Build your own websites using HTML, CSS, and JavaScript.</p>
                <a href="https://projects.raspberrypi.org/en/projects?software%5B%5D=html-css" className='text-blue-500 hover:underline'> Code Club Examples</a>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-blue-500 mb-2">Python Programming</h3>
              <p className="text-gray-700 mb-2">Explore the world of Python and create your own games and applications.</p>
               <a href="https://projects.raspberrypi.org/en/projects?software%5B%5D=python" className='text-blue-500 hover:underline'> Code Club Examples</a>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Register Now</h2>
          <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleRegistrationSubmit}>
            {registrationMessage && <p className="text-red-500 mb-4">{registrationMessage}</p>}

            {students.map((student, index) => (
              <div key={index} className="mb-4 border p-4 rounded-md">
                <h3 className="text-lg font-bold text-blue-500 mb-2">Student {index + 1}</h3>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`studentName-${index}`}>Student Name</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`studentName-${index}`}
                    type="text"
                    placeholder="Student Name"
                    value={student.name}
                    onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`studentAge-${index}`}>Student Age</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`studentAge-${index}`}
                    type="number"
                    placeholder="Student Age"
                    value={student.age}
                    onChange={(e) => handleStudentChange(index, 'age', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`studentEmail-${index}`}>Student Email</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`studentEmail-${index}`}
                    type="email"
                    placeholder="Student Email"
                    value={student.email}
                    onChange={(e) => handleStudentChange(index, 'email', e.target.value)}
                    required
                  />
                </div>
                {students.length > 1 && (
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => handleRemoveStudent(index)}
                                    >
                                        Remove Student
                                    </button>
                                )}
              </div>
            ))}

            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
              onClick={handleAddStudent}
            >
              Add Another Student
            </button>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parentName">Parent/Guardian Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="parentName"
                type="text"
                placeholder="Parent/Guardian Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parentEmail">Parent/Guardian Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="parentEmail"
                type="email"
                placeholder="Parent/Guardian Email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experienceLevel">Experience Level</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="experienceLevel"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">
                  I accept the{' '}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={() => setShowTerms(!showTerms)}
                  >
                    terms and conditions
                  </button>
                </span>
              </label>
            </div>

            {/* Terms and Conditions Modal */}
            {showTerms && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setShowTerms(false)}>
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                  <h3 className="text-lg font-bold text-blue-500 mb-4">Terms and Conditions</h3>
                  <p>
                    These are the terms and conditions for CoderDojo Westport.  Please read them carefully.
                    By registering your child, you agree to abide by these terms.  This includes ensuring
                    your child's safety and well-being while participating in our programs. We are not
                    responsible for any loss or damage to personal property.  We reserve the right to
                    use photos and videos taken during sessions for promotional purposes.
                  </p>
                  <button
                    type="button"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setShowTerms(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Volunteer With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                We are always looking for enthusiastic volunteers to help mentor our young coders.
                Whether you're a coding expert or just passionate about technology, we'd love to have you on board.
              </p>
              <p className="text-lg mb-4">
                Volunteer roles include:
              </p>
              <ul className="list-disc list-inside">
                <li>Technical Mentors</li>
                <li>General Helpers</li>
                <li>Event Organizers</li>
              </ul>
            </div>
            <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleVolunteerSubmit}>
              {volunteerMessage && <p className="text-green-500 mb-4">{volunteerMessage}</p>}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volunteerName">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="volunteerName"
                  type="text"
                  placeholder="Your Name"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volunteerEmail">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="volunteerEmail"
                  type="email"
                  placeholder="Your Email"
                  value={volunteerEmail}
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volunteerRole">
                  Preferred Role
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="volunteerRole"
                  type="text"
                  placeholder="Preferred Role"
                  value={volunteerRole}
                  onChange={(e) => setVolunteerRole(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volunteerSkills">
                  Skills
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="volunteerSkills"
                  placeholder="Your Skills"
                  value={volunteerSkills}
                  onChange={(e) => setVolunteerSkills(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">What Others Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic">"CoderDojo has been an amazing experience for my child. He's learned so much and made great friends!"</p>
              <p className="mt-4 text-gray-600">- Sarah M.</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic">"I love volunteering at CoderDojo. It's so rewarding to see the kids' enthusiasm for coding."</p>
              <p className="mt-4 text-gray-600">- John D.</p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic">"My daughter has developed so many new skills at CoderDojo. It's a fantastic program!"</p>
              <p className="mt-4 text-gray-600">- Emily R.</p>
            </div>
          </div>
        </div>
      </section>

        {/* Blog Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-blue-500 mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
            {/* For a non-technical user, consider integrating a CMS like TinaCMS, Netlify CMS, or Forestry.  These provide a user-friendly interface for editing content. */}
            {/* Example using TinaCMS (requires setup): */}
            {/* <TinaCMS> */}
            {/*     <BlogPosts posts={blogPosts} /> */}
            {/* </TinaCMS> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            {/* Social media icons (placeholders) */}
            <a href="#" className="text-blue-200 hover:text-white"><div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8" /></a>
            <a href="#" className="text-blue-200 hover:text-white"><div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8" /></a>
            <a href="#" className="text-blue-200 hover:text-white"><div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8" /></a>
          </div>
          <p className="mb-4">CoderDojo Westport</p>
          <p className="mb-4">Email: info@coderdojowestport.com</p>
          <p className="mb-4">Address: Westport, CT</p>
          <form onSubmit={handleNewsletterSignup} className="mb-4">
            {newsletterMessage && <p className="text-green-500">{newsletterMessage}</p>}
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="bg-white text-blue-600 px-4 py-2 rounded ml-2">
              Subscribe
            </button>
          </form>
          <p className="text-sm">© 2024 CoderDojo Westport. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoderDojoWestport;