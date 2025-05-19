import React from "react";
import Sidebar from "../components/Sidebar";
import EmailList from "../components/EmailList";
import EmailContent from "../components/EmailContent";
import LeadDetails from "../components/LeadDetails";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import TopBar from "../components/TopBar";
import { useDetails } from "../context/userContext";
function Home() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [leadDetails, setLeadDetails] = useState(null);
  const { darkMode } = useDetails();

  // Fetch emails from Firestore
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        // const emailsCollection = collection(db, "emails");
        // const emailSnapshot = await getDocs(emailsCollection);
        // const emailList = emailSnapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));
        const emailList = await fetch(
          `https://hiring.reachinbox.xyz/api/v1/onebox/list`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
              "Content-Type": "application/json", // Optional, based on API
            },
          }
        );
        console.log(emailList);
        console.log(emailList.bodyUsed);
        if (!emailList.bodyUsed) {
          throw new Error("body is empty");
        }

        setEmails(emailList.data);
      } catch (error) {
        console.error("Error fetching emails: ", error);

        // Use mock data if Firestore is not set up
        const mockEmails = [
          {
            id: "1",
            from: "beatrix@gmail.com",
            to: "lennon.j@mail.com",
            subject: "New Product Launch",
            greeting: "Hi Lennon,",
            body: "I would like to introduce you to SaaS Grow, a productized design service specifically tailored for saas startups. Our aim is to help you enhance the user experience and boost the visual appeal of your software products.",
            date: "Mar 7",
            status: "Interested",
            campaign: "Campaign Name",
            name: "Beatrix",
          },
          {
            id: "2",
            from: "sanya@gmail.com",
            to: "lennon.j@mail.com",
            subject: "I've tried it out and...",
            date: "Mar 7",
            status: "Closed",
            campaign: "Campaign Name",
            greeting: "Hi Lennon,",
            body: "I've been testing your software for the past week and I'm impressed with the functionality. I'd like to discuss some potential customizations for our team.",
          },
          {
            id: "3",
            from: "william@gmail.com",
            to: "lennon.j@mail.com",
            subject: "Payment not going through",
            date: "Mar 7",
            status: "Interested",
            campaign: "Campaign Name",
            greeting: "Hello Support Team,",
            body: "I've been trying to process a payment but keep getting an error message. Can you please help me resolve this issue?",
          },
          {
            id: "4",
            from: "johnson@gmail.com",
            to: "lennon.j@mail.com",
            subject: "Could you tell me more about it",
            date: "Mar 7",
            status: "Meeting Booked",
            campaign: "Campaign Name",
            greeting: "Hi there,",
            body: "I'm interested in learning more about your product suite. Could you provide additional details about pricing and features?",
          },
          {
            id: "5",
            from: "orlando@gmail.com",
            to: "lennon.j@mail.com",
            subject: "Hi, I am interested",
            date: "18:30",
            status: "Meeting Completed",
            campaign: "Campaign Name",
            greeting: "Hello Lennon,",
            body: "I'm interested in your services and would like to schedule a demo to learn more about how your product can help our business.",
          },
        ];
        setEmails(mockEmails);
      }
    };

    fetchEmails();
  }, []);

  // Handle email selection and fetch lead details
  const handleEmailSelect = (email) => {
    setSelectedEmail(email);

    if (email) {
      const fetchLeadDetails = async () => {
        try {
          const leadsCollection = collection(db, "leads");
          const q = query(leadsCollection, where("email", "==", email.from));
          const leadSnapshot = await getDocs(q);

          if (!leadSnapshot.empty) {
            setLeadDetails({
              id: leadSnapshot.docs[0].id,
              ...leadSnapshot.docs[0].data(),
            });
          } else {
            // Mock lead details if not found in Firestore
            setLeadDetails({
              email: email.from,
              name: email.name || email.from.split("@")[0],
              phone: "+54-9062827869",
              company: "ReachInbox",
              linkedin: "linkedin.com/in/timvadder/",
            });
          }
        } catch (error) {
          console.error("Error fetching lead details: ", error);
          // Mock lead details on error
          setLeadDetails({
            email: email.from,
            name: email.name || email.from.split("@")[0],
            phone: "+54-9062827869",
            company: "ReachInbox",
            linkedin: "linkedin.com/in/timvadder/",
          });
        }
      };

      fetchLeadDetails();
    }
  };
  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      } `}
    >
      {/* Sidebar */}
      <Sidebar />
      <TopBar />
      <EmailList
        emails={emails}
        selectedEmail={selectedEmail}
        onSelectEmail={handleEmailSelect}
      />
      <div
        className={` flex flex-col ${
          darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
        } w-[62.5rem] h-[97%] text-white relative top-14 overflow-y-auto`}
      >
        <EmailContent email={selectedEmail} />
      </div>
      {selectedEmail && (
        <LeadDetails email={selectedEmail} leadDetails={leadDetails} />
      )}
    </div>
  );
}

export default Home;
