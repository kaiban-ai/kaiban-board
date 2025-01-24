# **KaibanJS: The JavaScript Framework for AI**

AI workflows are the future of software development, but building robust, multi-agent systems in JavaScript can be challenging. That’s why we created [KaibanJS](https://github.com/kaiban-ai/KaibanJS), a framework designed to make integrating AI agents into JavaScript applications straightforward, flexible, and powerful.

With [KaibanJS](https://github.com/kaiban-ai/KaibanJS), you have the freedom to build AI-powered systems without being tied down by specific platforms or ecosystems. It's built from the ground up for JavaScript developers, with the MIT License, allowing you to freely use, modify, and deploy it wherever you need.

## **Kaiban Board: Visualize Your AI Agent Workflows**

While KaibanJS provides the framework to build your AI workflows, visualizing those workflows can be time-consuming and complex. To address this, we developed **Kaiban Board**—a UI designed to help you **visualize, manage, and share** your AI agent teams in a Kanban-style interface.

## **How to Use It**

To get started with the **Kaiban Board**, follow these steps:

### **Install Kaiban Board**

```bash
npm install kaiban-board
```

### **Usage Example**

Here’s a basic example of how to use **Kaiban Board** in your project:

```jsx
import 'kaiban-board/dist/index.css';  // Import the minified CSS
import KaibanBoard from 'kaiban-board';  // Import the minified JS

const teams = [
  // Define your teams and tasks here
];

const uiSettings = {
  //showWelcomeInfo: false,
};

function App() {
  return (
    <div>
      <KaibanBoard teams={teams} uiSettings={uiSettings} />
    </div>
  );
}

export default App;
```

## **License**

### **KaibanJS (Framework)**

**KaibanJS** is licensed under the **MIT License**, giving you full freedom to use, modify, and distribute the framework in both personal and commercial projects.

### **Kaiban Board (Visualizer)**

**Kaiban Board** is licensed under the **Kaiban Board Source-Available License v1.3**, which allows:

1. **Free Use for Non-Commercial Purposes**:
   - Personal, educational, or research use is free and unrestricted.

2. **Commercial Use for Smaller Entities**:
   - Organizations generating less than $1M USD in annual revenue from products or services using the Kaiban Board may use it under the license terms without additional fees.

3. **Licensing for Larger Enterprises**:
   - Organizations generating more than $1M USD in annual revenue from products or services using the Kaiban Board must obtain a commercial license.

4. **Prohibited Uses**:
  - **No SaaS/Hosted Services**: The Kaiban Board may not be used to provide a hosted or managed service (e.g., Software-as-a-Service) without prior written permission.
  - **No Unauthorized Modifications**: Modified versions of the Kaiban Board may not be used for commercial purposes (e.g., integrating into paid products) without prior written permission.

For inquiries about licensing modifications or extended features, please [contact us](mailto:hello@kaiban.ai).

## **Why This Licensing Model?**

Maintaining a high-quality software project like **KaibanJS** and **Kaiban Board** requires significant resources. From development and hosting to documentation, community support, and feature updates, the cost of sustaining an open-source project is substantial.

We are committed to:
- Keeping KaibanJS and Kaiban Board **accessible and developer-friendly**.
- Ensuring **long-term sustainability** so the project can continue to grow and improve.
- Fostering a community-driven ecosystem while protecting our ability to fund future innovation.

### **How Revenue Supports the Project**
A substantial portion of revenue generated from commercial engagements is reinvested back into the project. These funds enable us to:
- Add new features and enhancements based on community feedback.
- Offer timely updates and security fixes.
- Scale the framework to meet the needs of developers and enterprises.
- Provide better documentation, support, and learning resources.

By balancing accessibility with sustainability, this licensing model ensures that **developers of all kinds—hobbyists, startups, and enterprises—can benefit from Kaiban Board**, while larger commercial users contribute to the project’s growth.

## **Feedback and Future Development**

We’re in the **early stages** of Kaiban Board’s development, and your feedback is essential in helping us shape its future. If you have suggestions or run into issues, please let us know! 

> Over time, we’ll continue refining both the UI and the licensing approach to ensure Kaiban Board works for developers and enterprises alike.

For questions, feedback, or licensing inquiries, please [contact us](mailto:hello@kaiban.ai).
