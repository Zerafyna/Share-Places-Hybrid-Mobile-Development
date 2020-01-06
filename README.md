![App Logo](/assets/splash-small.jpg)
# Hybrid Mobile Development Project
*Project is built using React Native, Expo, Firebase, Redux & React Navigation.*


Share Places is a mobile app that brings people together to share places. Every registered user can share pictures of places they have visited and indicate them using locations nearby. They can describe the location of the place in the description or indicate the address. Everyone can see the posts and like or unlike them. Users have their profiles, which can be edited.

To see the application please check the [video](/SharePlaces_Video.mp4).


## Signup and Login
Users can Login via Facebook or register with email, password and user name.

- Signup: User must provide email, password and user name. They also can add their profile picture.
- Login: User must provide email and password.
- Facebook login: User must login with Facebook app.


## Home
On the home page users can see all the posts made by them and other users.
Functionality:

- Like / Unlike posts.
- Open location to see it on the map.
- Refresh by slide down.
- Camera: will take the picture and will bring you to the Post page.


## Post
Send the post information to the database including the user info.

- Picture from the camera or library.
- Description.
- Optionally place location.


## Activity
Shows activity of the logged in user.

- Action type (like)
- Action date
- Action user
- Photo that was involved in the action


## Profile
User information can be accesses in Profile section. They can change their information or Logout.

 - Email – only for display
 - User name
 - Bio
 - Profile picture
