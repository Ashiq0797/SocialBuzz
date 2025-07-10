#  SocialBuzz


A feature-rich, scalable, and secure **social media platform** built using **Firebase** and modern frontend architecture. SocialBuzz enables users to create profiles, upload photos, interact via likes and comments, follow others, and receive real-time notifications—delivering a user experience inspired by leading social platforms.




##  Features


###  Authentication & Profiles
- Secure user registration and login via **Firebase Authentication**
- Encrypted password handling using built-in hashing mechanisms
- Profile creation with personalized user details and image uploads


###  Post & Share
- Upload photos with captions
- Posts stored in **Firebase Firestore**
- Curated newsfeed showing posts from followed users
- Real-time updates upon content changes


###  Search Functionality
- **Basic Search**: Search by photo captions using keyword filtering
- **Advanced Search**:
  - `postedBy:<username>` for filtering by uploader
  - Username search to find and navigate to user profiles


###  Social Networking
- Follow/unfollow users to build a personal network
- Dynamic newsfeed based on follows
- Display follower and following lists on profile pages


###  Engagement
- Like and comment on posts
- Real-time UI updates using Firebase listeners
- Responsive layout for all devices


###  Notification System
- Instant notifications to followers when a user uploads a photo
- Notifications displayed in a dedicated modal
- Stored in Firestore with fields: `noti_id` and `description`


---


##  Tech Stack


- **Frontend**: React (Component-based SPA)
- **Backend**: Serverless (Firebase Authentication, Firestore, Firebase Storage)
- **Database**: Firebase Firestore (NoSQL Document Model)


---


## Architecture Overview


###  Architecture Pattern
- **Component-Based Frontend**: React-based modular design improves maintainability and reusability.
- **Serverless Backend**: Firebase handles authentication, data, and real-time updates—eliminating the need for manual server management.


---


## 🧪 Testing


- **Unit Testing**: Basic Jest test on the profile component to verify proper rendering and logic
- **Integration Testing**: Postman used to simulate user interaction and data flow, particularly around posting, liking, and authentication
- Future plans include expanding test coverage with real-time simulation and edge case validation


---


## 📌 Setup Instructions


### 1. Clone the Repository
```bash
git clone https://gitlab.cim.rhul.ac.uk/wlis116/PROJECT.git
cd social-shout

### 2. Install Dependencies
```bash
npm install
```
### 3. Run the app
```bash
npm start
```

```

### 🐛 Common Issues & Fixes 
####  Case Sensitivity Error on Some Operating Systems If the app fails to compile with an error like:
 ``` Module not found: Error: Cannot find file: 'user.js' does not match the corresponding name on disk: './User.js' ``` 


This means that the **import path is case-sensitive** and must match the actual file name. 


**Fix**: Open the file `src/components/sidebar/index.js` and update the import statement: 
```js // Change this: import User from './user'; // To this: import User from './User'; ``` This resolves the mismatch between the import and the actual file name, especially on case-sensitive file systems like Linux. 

  #### 🌿 Main Branch Not Running? If you're facing issues running the app from the `main` branch (e.g., build errors or missing features), it might be outdated. ✅ **Fix**: Switch to the latest stable development branch: 
```bash git checkout notification-dev 
``` 
This branch includes the most up-to-date features and working codebase. 







