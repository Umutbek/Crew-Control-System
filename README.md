# Crew Control System

## Overview
The Crew Control System is a dual-platform application designed to modernize landscaping business management. It includes a web application for business management and a mobile app for crew members, enhancing accessibility and usability. The system leverages a Large Language Model (LLM) for an intelligent chatbot to improve user interactions and data processing. A multi-tenant architecture ensures robust data security and privacy by isolating each business’s data.

## Features
### Mobile Application
- **Job Management:** Schedule, start, and complete jobs with status updates.
- **Data Handling:** Record start/end times, total work hours, job statuses, and crew notes.
- **User Interaction:** View job schedules, mark services as done, and add notes.

### LLM Integration
- **Chatbot Assistance:** Use ChatGPT-API to handle queries about job sites, routes, weather, and equipment maintenance.
- **External APIs:** Integrates Google API for store locations and traffic updates, Weather API for weather information.

### Security Measures
- **Multi-Tenant Architecture:** Ensures data isolation and robust protection for each business.
- **Regular Audits:** Conducts security audits and penetration testing to maintain high-security standards.

## Installation
### Prerequisites
- Python 3.8 or higher
- PostgreSQL

### Backend Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/Umutbek/Crew-Control-System.git
    cd Crew-Control-System
    ```
2. Set up a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3. Install the backend dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4. Set up the PostgreSQL database and configure the environment variables in `.env`.

5. Run migrations and start the server:
    ```sh
    python manage.py migrate
    python manage.py runserver
    ```

### Web Frontend Setup
1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install the frontend dependencies:
    ```sh
    npm install
    ```
3. Start the frontend development server:
    ```sh
    npm start
    ```

### Mobile Application Setup
1. Navigate to the mobile directory:
    ```sh
    cd mobile
    ```
2. Install the mobile app dependencies:
    ```sh
    npm install
    ```
3. Start the mobile app (ensure you have an emulator running or a physical device connected):
    ```sh
    npx react-native run-android  # For Android
    npx react-native run-ios      # For iOS
    ```

## Usage
- **Web Application:** Manage jobs, crews, and operational efficiency.
- **Mobile Application:** Access job schedules, update job statuses, and communicate via the chatbot.

## Future Work
- **Upgrading LLM for Smart Scheduling:** Enhance LLM capabilities to assist in complex scheduling tasks and predictive resource allocation.
- **Billing and Invoicing Integration:** Add functionalities for billing and invoicing by integrating with QuickBooks.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, please contact:
- **Umutbek Abdimanan uulu:** abdimananuuluumutbe@cityuniversity.edu

---
