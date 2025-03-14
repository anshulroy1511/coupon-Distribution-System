# coupon-Distribution-System
# Coupon-distribution-system
This project is a live web application that distributes coupons to guest users in a round-robin manner while preventing abuse using IP and cookie tracking.

Features

Coupon Distribution: Sequential assignment of coupons to users.
Guest Access: No login or account creation required.
Abuse Prevention: Limits multiple claims using IP and cookie tracking.
User Feedback: Displays messages for successful claims or cooldown period

Setup Instructions :-------------

Step 1 :  Clone the repository
Step-2 : Install dependencies: npm install
Step3 : Configure environment variables: create a .env file and add :--
         MONGO_URI=mongodb://localhost:27017/coupons
         PORT=5000
 
Step 4:  Start the server:cd backend  
step 5:  Run the frontend (if applicable):
         cd frontend
        npm install
        npm start

Abuse Prevention Strategies

IP Tracking: Each user's IP address is recorded upon claiming a coupon. Further claims from the same IP are restricted within a specified timeframe.

Cookie Tracking: Cookies track coupon claims from the same browser session, preventing abuse by page refresh