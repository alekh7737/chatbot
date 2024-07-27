// DOM elements for the first chatbot
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const imageUploadInput = document.getElementById('image-upload-input');

// DOM elements for the second chatbot
const chatInput2 = document.getElementById("user-input");
const sendChatBtn2 = document.getElementById("send-btn");
const chatbox2 = document.querySelector(".chatbox2");
const backgroundImageInput = document.getElementById('background-image-input');
backgroundImageInput.addEventListener('change', handleBackgroundImageUpload);

// Event listeners for the first chatbot
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Event listener for image upload
imageUploadInput.addEventListener('change', handleImageUpload);

// Event listeners for the second chatbot
sendChatBtn2.addEventListener("click", handleChat2);
// Function to handle image upload
// Function to handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0]; // Get the uploaded file
    if (!file) return;

    // Create an image element
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file); // Set the image source to the uploaded file
    img.alt = "Image";

    // Convert image URL to lowercase for comparison
    const lowercaseImgSrc = img.src.toLowerCase();
    console.log("Uploaded Image URL (Lowercase):", lowercaseImgSrc);

    // Check if the image URL matches any question in qaDictionary
    for (const question in qaDictionary) {
        const lowercaseQuestionImgSrc = qaDictionary[question].toLowerCase();
        console.log("Question Image URL (Lowercase):", lowercaseQuestionImgSrc);
        if (lowercaseQuestionImgSrc === lowercaseImgSrc) {
            // If a matching question is found, display the corresponding answer
            appendChat("incoming", question);
            // Append the image to the chat input area
            chatbox.appendChild(img);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            return; // Exit the function since we found a match
        }
    }

    // If no matching question is found, display "Image not found" message
    appendChat("incoming", "Image not found.");

    // Append the image to the chat input area
    chatbox.appendChild(img);
    chatbox.scrollTo(0, chatbox.scrollHeight);
}


// Function for the first chatbot to handle user input and generate responses
function handleChat() {
    let userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea
    chatInput.value = "";

    // Append the user's message to the chatbox
    appendChat("outgoing", userMessage);

    // Process the user's question and generate response
    const response = generateResponse(userMessage);
    appendChat("incoming", response);
}

// Function for the second chatbot to handle user input and generate responses
function handleChat2() {
    let userMessage = chatInput2.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea
    chatInput2.value = "";

    // Append the user's message to the chatbox
    appendChat2("outgoing", userMessage);

    // Process the user's question and generate response
    const response = generateResponse(userMessage);
    appendChat2("incoming", response);
}
const qaDictionary = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi! How can I assist you today?",
    "hh hh hh hh ": "hh",
    "how are you arya": "I'm doing well, thank you!",
    "what is your name": "My name is Arya",
    "www":"<a href='http://127.0.0.1:5500/extra/html1.html'><img src='mapp.jpg' alt='Image'></a>",
    "where is sathyabama institute of science and technology located": "The campus is well within the limits of the City of Chennai and is located in the Rajiv Gandhi Salai (Old Mahabalipuram Road- OMR). Sathyabama is within 20 Kms from Airport and 25 Kms from Dr.MGR Chennai Central Railway Station. Nearest Sub-Urban Railway Station is Tambaram.",
    "what are the programmes offered in sathyabama": "Sathyabama offers Bachelors and Masters Degree Programmes in Engineering, Architecture, Dental Science, Management, Arts, Science and Humanities. It offers Bachelors Programmes in Nursing, Pharmacy and Law.",
    "is there any exam to get admission into sathyabama": "Yes, Sathyabama conducts ALL INDIA SATHYABAMA ENTRANCE EXAMINATION for the admission into Under-graduate Engineering Programmes (SAEEE), which is usually conducted in the month of April, every year.",
    "what is the procedure for nri admissions": "NRI admission is possible based on the merit obtained in the qualifying examination. All other necessary documents such as migration certificate, equivalence certificates shall be produced at the time of admission.",
    "how can i apply for any course in sathyabama": "You can apply online as well as offline. For offline admission, please contact us at Admission office, First Floor, Administrative Block, Sathyabama Institute of Science and Technology.",
    "whom to contact for queries regarding admission": "You can contact Admission Office or Entrance Examination Cell through the following Phone numbers. Admission Helpline: 044-24502436, 044-24500600, 9940058263, 9940168007, 9940069538",
    "what are the timings of the institution": "The institution works on all week days (Mon-Sat) from 9.00 A.M. to 3.15 P.M.",
    "what are the credentials of the institution": "Sathyabama has been granted the Deemed to be University status under Section 3 of the UGC Act, 1956. The institution is accredited by various reputed government bodies such as NAAC (with “A++” grade) and approved by the relevant regulatory bodies such as AICTE, Pharmacy Council of India (Pharmacy Programmes), Dental Council of India (Dental Programmes), Bar Council of India, Tamilnadu Nurses and Midwives council, Council of Architecture.",
    "what are the rankings and ratings of the institution": "Sathyabama has a good presence in rankings and ratings at National and International level. The Institution has been ranked in 51st position by the National Institutional Ranking Framework (NIRF), Government of India among the Universities in India for the year 2023 and ranked one among the top 100 Universities for eight consecutive years. Sathyabama is ranked among the Top 5 Institutions in the Country for Innovation by ATAL ranking of Institutions on Innovation Achievements, Govt. of India.",
    "what are the key features of the institution": "Excellent Academic Ambience • State of the art Infrastructure • World Class Research Facilities • Technological Solutions to Sustainable Societal Development • Incubation Facilities for Start Ups and Promotion of Entrepreneurship • Centres of Excellence in Thrust Areas of Research • Working towards Sustainable Development Goals • Students participation in Exchange, Semester Abroad, Internship Abroad Programmes • Blended Learning • Online Courses • 200+ Overseas Partners • 250+ MoUs",
    "what about the library facility in college?": "The library at Sathyabama College is a great resource for students. It consists of a wide range of books, journals, and reference materials to support academic studies across various disciplines.",
    "what are the timings of library?": "The timings of the library at Sathyabama College usually operate from morning to evening.",
    "what are the initiatives or programs at sathyabama college aimed at promoting art and culture?": "Some programs like art exhibitions, cultural festivals, literacy events, music and dance competitions, workshops and workshops.",
    "who is chancellor of sathyabama university?": "Dr. Maria Zeena Jhonson",
    "how many academic staff are there in college?": "Total 738 academic staff are there.",
    "how many administrative staff are there in college?": "Total 67 administrative staff are there.",
    "approximately how many students are there in college?": "Approximately 17000 students are there.",
    "what is the famous quote that given by dr  jeppiaar?": "The quote-“Entry is not important, Exit is important”.",
    "how many hostels are there for students?": "The institution is housing 5 hostels for boys and 5 hostels for girls.",
    "is any medical facility available in hostels?": "24 Hours medical facility is available in the Hostel.",
    "how many auditoriums are there in college?": "11 Auditoriums with excellent thermal and acoustic support.",
    "how many conference halls are there?": "There are 12 Conference halls with good visual aids and multimedia presentations to enhance their learning experience.",
    "how many seminar halls?": "There are total 6 seminar halls present inside college.",
    "who are the celebrities came for the culturals celebrated on 2020 ?": "Some famous celebrities like Mr. Dhruv Vikram, Ms. Aditi Rao Hydari, Mr. Yash and singers are Devi sri prasad and Velmurugan.",
    "who are the celebrities came for culturals in year 2023?": "Famous Celebrities like Rakul Preeth singh, Arjun das, Nayanathara and Rana Daggubati came for culturals in 2023.",
    "how many buses are there for transportation?": "Approximately more than 150 busses for students and faculty members are there.",
    "how to contact with the management about the transport queries?": "We can contact with management about transport queries like E-mail : transport@sathyabama.ac.in Contact No: 044-24503150",
    "what about ncc in sathyabama?": "National Cadet Corps (NCC) Army wing, Sathyabama Institute of Science and Technology, belongs to 1 (TN) Medical Unit NCC. With the blessings from our Founder Chancellor Dr. JEPPIAAR., M.A., B.L., Ph.D., Army Wing NCC was started in the year 2012.",
    "how many companies visit sathyabama university?": "The recruitment process has seen active involvement of 400+ recruiters.",
    "what are the companies that visit frequently?": "Companies like Amazon, Accenture, Capgemini, Cognizant, Deloitte, HCL, IBM, Bank of America, Nokia, ICIC, Tech Mahindra, Hyundai, InMobi, NatWest, etc.",
    "what is the highest package for cse sathyabama?": "53 LPA is the highest package for CSE.",
    "how to reach admission block from main gate":"[image]admission block.jpg",
    "admission block.jpg":"its aadmission block",
    "[image]advanced block.png":"hello",    
    "what is the package offered by dream companies?": "The companies offer between 5LPA and 10 LPA considered as dream companies.",
    "what is the package offered by super dream companies?": "The companies offer above 10LPA will considered as superdream companies.",
    "what are the specialization courses in be that offered by college?": "Specialization courses like BE in Artificial intelligence, BE in Artificial intelligence and Machine learning, BE in Internet of things, BE in Cyber security, BE in Data Science, BE in Block chain technology are there.",
    "when was sathyabama dental college and hospital established?": "Sathyabama Dental college and Hospital was established in 2009 under vision of Founder chancellor Dr. Jeppiar MA.BL,Ph.D.",
    "what are the dentistry offers by college?": "Orthodontics and Dentofacial Orthopedics, Conservative Dentistry and Endodontics, Pediatric and Preventive Dentistry with a duration of three years.",
    "what are the other facilities that available in college?": "Open air theatre, church, transport block, metrological tower, aero hanger, sewage treatment plant etc. are other facilities that available in college.",
    "what about sports club that existed in college?": "The college has sports clubs for cricket, football, basketball, volleyball, badminton, table tennis, and many other sports, allowing students to engage in both competitive and recreational activities.",
    "what facilities and amenities are offered in the research parks at sathyabama college?": "Research parks at Sathyabama College may offer state-of-the-art facilities, including laboratories, workshops, collaborative spaces, meeting rooms, and equipment for research and development activities.",
    "how are research parks at sathyabama college utilized by students and faculty?": "Research parks serve as hubs for interdisciplinary research, innovation, and entrepreneurship.",
    "are there any specialized research labs or centers within sathyabama college?": "Yes, Sathyabama College may have specialized research labs or centers focusing on specific fields such as robotics, biotechnology, nanotechnology, renewable energy, artificial intelligence, and more.",
    "how do research parks and labs at sathyabama college contribute to academic excellence and innovation?": "Research parks and labs facilitate cutting-edge research, experimentation, and innovation, enabling students and faculty to address real-world challenges, develop new technologies, and make significant contributions to their respective fields.",
    "are there opportunities for collaboration and partnerships with industry organizations in the research parks at sathyabama college?": "Yes, Sathyabama College encourages collaboration and partnerships with industry organizations through its research parks and labs.",
    "how are students involved in research activities within the research parks and labs at sathyabama college?": "Students at Sathyabama College have opportunities to participate in research projects, internships, and hands-on learning experiences within the research parks and labs.",
    "can students access research facilities and resources in the research parks and labs outside of regular class hours?": "Yes, students may have access to research facilities and resources in the research parks and labs outside of regular class hours, allowing them to pursue independent research projects or collaborate with peers and faculty members on research initiatives.",
    "what is the timeline for applying to higher studies programs at sathyabama college?": "The application deadlines for higher studies programs may vary depending on the specific program and intake cycle.",
    "what support does sathyabama college offer to students interested in pursuing research-oriented higher studies programs such as ph d?": "Sathyabama College provides support to students interested in research-oriented higher studies programs, including guidance from faculty mentors, access to research facilities and resources, assistance in preparing research proposals, and opportunities for collaboration on research projects.",
    "what is the duration of the M.Tech program at sathyabama college?": "The M.Tech program at Sathyabama College is typically a two-year full-time program divided into four semesters.",
    "are there any industry collaborations or internships offered as part of the m tech program?": "Yes, Sathyabama College may have collaborations with industry partners to offer internships, industry projects, and hands-on training opportunities to M.Tech students.",
    "what features are available in the lms for students and faculty at sathyabama college?": "The LMS platform may offer features such as course calendars, announcements, gradebooks, multimedia content integration, assessment tools, attendance tracking, and performance analytics for both students and faculty members.",
    "can students and faculty access the lms and erp system from mobile devices?": "Yes, Sathyabama College may offer mobile apps or mobile-responsive web interfaces for accessing the LMS and ERP system from smartphones and tablets, allowing users to stay connected and access important information on the go.",
    "how does sathyabama college ensure data security and privacy within the lms and erp system?": "Sathyabama College implements robust security measures such as data encryption, user authentication, access controls, regular audits, and compliance with data protection regulations to safeguard sensitive information stored within the LMS and ERP system.",
    "what are arrear exams and when are they typically conducted at sathyabama college?": "Arrear exams are supplementary examinations conducted for students who have failed to clear one or more subjects in their regular exams.",
    "what are the eligibility criteria for various courses that available in college?": "Candidates must have completed their higher secondary education (10+2) from a recognized board or institution for UG and for PG Candidates must hold a bachelor's degree in the relevant field from a recognized university or institution.",
    "how can students apply for scholarships at Sathyabama College?": "Students can apply for scholarships at Sathyabama College through the official college website by filling out the scholarship application form and submitting required document.",
    "can international students apply for scholarships at sathyabama college?": "Yes, international students can apply for scholarships at Sathyabama College.",
    "how are scholarship recipients selected?": "Scholarship recipients at Sathyabama College are typically selected based on various factors, including academic performance, financial need, extracurricular activities, leadership qualities, and any specific eligibility criteria outlined for each scholarship program.",
    "how does sathyabama college ensure transparency and fairness in the scholarship selection process?": "Sathyabama College ensures transparency and fairness in the scholarship selection process through rigorous evaluation criteria, clear eligibility guidelines, impartial review committees, and adherence to predetermined selection criteria.",
    "what is an industrial tour at sathyabama college?": "An industrial tour at Sathyabama College is an educational excursion organized by the college to provide students with practical exposure to industrial environments and real-world applications of their academic studies.",
    "how are industrial tours organized at sathyabama college?": "Industrial tours at Sathyabama College are typically organized by the respective departments in collaboration with industry partners. Faculty members coordinate logistics, including transportation, itinerary, and scheduling, to ensure a smooth and enriching experience for students.",
    "what is the purpose of industrial tours at sathyabama college?": "The primary purpose of industrial tours is to supplement classroom learning with hands-on experience and insights into industrial processes, technologies, and practices. These tours help students bridge the gap between theory and practice and gain a deeper understanding of their field of study.",
    "how do industrial tours benefit students at sathyabama college?": "Industrial tours provide students with opportunities to observe industrial operations firsthand, interact with industry professionals, and gain practical knowledge and skills that are relevant to their academic coursework and future careers. These tours also foster networking opportunities and inspire students to explore diverse career paths.",
    "what types of industries do students visit during industrial tours at sathyabama college?": "Students at Sathyabama College visit a wide range of industries relevant to their fields of study, including manufacturing plants, research laboratories, technology firms, engineering facilities, and service organizations.",
    "how are industrial tours integrated into the curriculum at sathyabama college?": "Industrial tours are often incorporated into the curriculum as part of specific courses or academic programs. Faculty members may design assignments, projects, or reports based on the experiences gained during the industrial tour to further enhance students' learning outcomes.",
    "what support does sathyabama college offer to students interested in starting their own ventures or startups?":"Sathyabama College provides various forms of support to students interested in entrepreneurship and startups, including mentorship, incubation facilities, networking opportunities, funding assistance, and access to resources and expertise.",
    "how does sathyabama college foster an entrepreneurial culture among its students?": "Sathyabama College promotes an entrepreneurial culture by organizing events, workshops, seminars, and competitions related to entrepreneurship, inviting successful entrepreneurs as guest speakers, and facilitating interactions with industry experts and investors.",
    "are there any dedicated entrepreneurship or innovation centers at sathyabama college?": "Yes, Sathyabama College may have dedicated entrepreneurship or innovation centers that provide infrastructure, support services, and guidance to students aspiring to launch startups.",
    "can students receive academic credit or recognition for participating in startup-related activities at sathyabama college?": "Yes, students may have the opportunity to receive academic credit or recognition for participating in startup-related activities such as entrepreneurship courses, internships with startups, or involvement in entrepreneurship clubs or competitions.",
    "are there any success stories of startups launched by sathyabama college students or alumni?": "Yes, Sathyabama College may have success stories of startups launched by students or alumni who have benefited from the college's support and resources.",
    "how does Sathyabama College facilitate connections with investors, mentors, and industry professionals for students interested in startups?": "Sathyabama College organizes networking events, pitch sessions, demo days, and investor showcases where students can connect with potential investors, mentors, and industry professionals.",
    "are there any funding opportunities or seed grants available for students to kickstart their startup ventures at sathyabama college": "Yes, Sathyabama College may offer funding opportunities, seed grants, or startup competitions where students can pitch their ideas and receive financial support to launch their ventures.",
    "how can i reach advanced block from main gate": "<a href='https://www.google.com/maps/dir/12.8729365,80.2263415/12.872826,80.2218404/@12.8731469,80.219062,16z/data=!3m1!4b1!4m6!4m5!1m1!4e1!1m1!4e1!3e9?entry=ttu'><img src='advanced block.png' alt='Image'></a>",   
};

// Function to append chat messages for the first chatbot

// Function to append chat messages for the first chatbot
function appendChat(className, message) {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    // Check if the message contains an image with a link and text
    const imageWithLinkAndTextRegex = /<a href="(.*?)"><img src="(.*?)" alt="(.*?)"><\/a><br>(.*)/;
    const imageWithLinkAndTextMatch = imageWithLinkAndTextRegex.exec(message);

    if (imageWithLinkAndTextMatch) {
        // If an image with a link and text is found
        const link = document.createElement("a");
        link.href = imageWithLinkAndTextMatch[1]; // URL
        const img = document.createElement("img");
        img.src = imageWithLinkAndTextMatch[2]; // Image URL
        img.alt = imageWithLinkAndTextMatch[3]; // Alt text
        img.classList.add("chatbot-image"); // Add the class for styling

        const text = document.createElement("span");
        text.textContent = imageWithLinkAndTextMatch[4]; // Text

        link.appendChild(img);
        chatLi.appendChild(link);
        chatLi.appendChild(text);
    } else {
        // If no image with a link and text is found, append the message as text
        chatLi.innerHTML = message;
    }

    chatbox.appendChild(chatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

// Function to append chat messages for the second chatbot
function appendChat2(className, message) {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.textContent = message;
    chatbox2.appendChild(chatLi);
    chatbox2.scrollTo(0, chatbox2.scrollHeight);
}

// Function to generate response for the user's message
// Function to generate response for the user's message
function generateResponse(message) {
    const lowerCaseMessage = message.toLowerCase(); // Convert message to lowercase
    
    // Check if the message contains an image with a link
    const containsImageWithLink = /<a href="(.*?)"><img src="(.*?)" alt="(.*?)"><\/a>/.exec(message);

    if (containsImageWithLink) {
        // If an image with a link is found, extract the image URL
        const imageUrl = containsImageWithLink[2];
        
        // Iterate over the qaDictionary to find if the image URL matches any question
        for (const question in qaDictionary) {
            if (qaDictionary[question].includes(imageUrl)) {
                // If a matching question is found, return the corresponding answer
                return qaDictionary[question];
            }
        }
        
        // If no matching question is found, return a default response
        return "Sorry, I don't have an answer for that question.";
    } else {
        // If the message does not contain an image, check if it matches any question in the qaDictionary
        const answer = qaDictionary[lowerCaseMessage];
        if (answer) {
            return answer;
        } else {
            return "Sorry, I don't understand that question.";
        }
    }
}



// Function to handle background image upload
function handleBackgroundImageUpload(event) {
    const file = event.target.files[0]; // Get the uploaded file
    if (!file) return;

    // Set the background image of the chatbox to the uploaded image
    document.body.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
}
