# 🚀 SpeakEasy.AI – Your AI-Powered Blogging Buddy  

A magical AI-powered SAAS app that makes blogging a breeze! 🎉 With our intuitive interface, AI-driven content generation, and seamless user experience, creating high-quality blog posts has never been easier.  

🔗 **[Check out the live app here!](https://speak-easy-ai.vercel.app/)**  

---

## ✨ Features  

### 🤑 **Subscription Plans**  
- Choose between **Basic** and **Pro** plans to unlock full AI blogging power!  
- Powered by **Stripe Checkout** for secure and hassle-free payments.  
- Subscriptions managed automatically via webhooks:  
  - ✅ Payment success = instant access.  
  - ❌ Canceled subscription = downgraded features.  

### 🔐 **User Authentication**  
- We use **Clerk Auth** to ensure secure logins.  
- Users are seamlessly linked to their app data in the database.  

### 🤖 **AI-Driven Blog Creation**  
1. **🎤 Upload Audio:**  
   - Upload audio files and let **Whisper AI** do the transcription magic.  
2. **📝 Generate Blog Posts:**  
   - Transcriptions are turned into beautifully written blog posts using **OpenAI**.  
3. **✍️ Edit with Markdown:**  
   - Use our built-in Markdown Editor to refine your posts before publishing.  

### 🗄️ **Database at a Glance**  
- **Users Table:** Tracks user profiles and subscriptions.  
- **Payments Table:** Monitors Stripe transactions and statuses.  
- **Posts Table:** Stores user-created and AI-generated blog posts.  

### 🚀 **Smooth Deployment Workflow**  
- Separate **Development**, **Staging**, and **Production** environments for top-notch reliability.  
- Database cloning ensures bug-free updates before hitting production.  

---

## 🛠️ Architecture Overview  
 ![image](https://github.com/user-attachments/assets/f6c3742d-d652-47d8-9ee8-0954bfc18923)


---

## 🔥 Tech Stack  

### 💻 **Frontend**  
- ⚡ **Next.js**: Fast and modern React framework.
- ✨ **ShadCN**: Elegant UI components for building delightful user interfaces.
- 🎨 **Tailwind CSS**: CSS framework for beautiful and responsive design.  
- ✍️ **Markdown Editor**: Smooth and easy blog post customization.  

### 🖥️ **Backend**  
- 🚀 **Node.js**: Powerful backend for serverless operations.  
- 🗣️ **Whisper AI**: Lightning-fast speech-to-text transcription.  
- 💡 **OpenAI GPT**: AI magic for generating high-quality blog content.  

### 🗄️ **Database**  
- 🛢️ **NeonDB**: Secure, fast, and scalable relational database.  

### 💳 **Payments**  
- 💰 **Stripe**: Hassle-free subscription and payment handling.  

### 🔒 **Authentication**  
- 🔐 **Clerk Auth**: Robust, secure, and developer-friendly auth system.  

---


🎉 **Get started with SpeakEasy AI today and create stunning blogs effortlessly!**  
