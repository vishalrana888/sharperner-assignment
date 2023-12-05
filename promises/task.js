// Simulated database functions
const createUserPost = (post) => {
    // Simulating creation of a user post (returns a promise)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(post);
      }, 1000);
    });
  };
  
  const updateLastUserActivityTime = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentTime = new Date();
        const options = {
          timeZone: 'Asia/Kolkata', // Set the timezone to Indian Standard Time (IST)
          hour12: false, // Use 24-hour format
        };
        const updatedLastActivityTime = currentTime.toLocaleString('en-IN', options);
        resolve(updatedLastActivityTime);
      }, 1000);
    });
  };
  
  
  const deletePost = (postId) => {
    // Simulating deletion of a user post (returns a promise)
    return new Promise((resolve, reject) => {
      // Assuming successful deletion after 1 second
      setTimeout(() => {
        console.log(`Deleted post with ID: ${postId}`);
        resolve();
      }, 1000);
    });
  };
  
  // Function to handle post creation and updating user's activity time
  const handlePostCreation = async (postContent) => {
    try {
      const createdPost = await createUserPost(postContent);
      const updatedLastActivityTime = await updateLastUserActivityTime();
  
      console.log('All posts:', [createdPost]); // Log all posts (in this case, only the latest one)
      console.log('Last Activity Time:', updatedLastActivityTime);
  
      // Deleting the last post after both promises resolve
      await deletePost(createdPost.id);
  
      console.log('Remaining Posts: []'); // Log that there are no remaining posts
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Usage: Call handlePostCreation when a user creates a post
  let newPostContent = 'This is a new post!';
  handlePostCreation({ id: 1, content: newPostContent });
   newPostContent = 'This is a  post!';
  handlePostCreation({ id: 2, content: newPostContent });
  
  