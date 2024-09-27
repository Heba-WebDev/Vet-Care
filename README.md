# Vet-Care

🚧 version 2 of the API is currently under development. Kindly check v1 branch to see the full features 🚧

## _Introduction_

Vet-Care is a veterinary clinic management system designed to handle staff, clients, pets, appointments, appointment notifications, and payments. The system follows clean architecture principles, ensuring clear separation of concerns and maintainability.

## _Technologies_

Expressjs - TypeScript - Postgres - Prisma - Joi - Jsonwebtoken - Swagger

## _Architecture Overview_

The second version of the API adheres to clean architecture principles. The application is structured into three distinct layers:

### 1. Presentation Layer

- The presentation layer handles external communication with various systems, including APIs, UI components, and HTTP/S requests.

- It acts as the entry point for external interactions and translates them into domain-specific use cases.

- Examples of components in this layer include controllers, routes, and user interfaces.

### 2. Domain Layer

- The domain layer encapsulates the core business rules, entities, data transfer objects (DTOs), validation logic, and use cases.

- Entities represent the fundamental business concepts (e.g., staff, clients, pets) and contain the essential logic.

- Use cases define how these entities interact and enforce business rules.

- Validation rules are also part of this layer, ensuring data integrity.

- DTOs facilitate data exchange between layers.

- The domain layer remains independent of external concerns.

### 3. Infrastructure Layer

- Infrastructure deals with external services and technical details.

- It includes components responsible for database access, authentication, external APIs, and other integrations.

- The infrastructure layer interacts with databases (e.g., Postgres), third-party libraries (e.g., Prisma), and validation tools (e.g., Joi).

- Keeping infrastructure separate from the domain ensures flexibility and testability.

#### Additionally:

- The application follows the Vertical Slice technique, where each major feature or use case has its own dedicated folder structure.

- Within each feature folder, you’ll find subfolders corresponding to the three layers (presentation, domain, and infrastructure).

- Any shared code or utilities between different features reside at the root level within their respective layers.

This architecture promotes maintainability, scalability, and clear separation of concerns. 🏗️🚀

## _End points_

<a href="https://documenter.getpostman.com/view/29481678/2sA3dxCWit" target="_blank">
  Postman
</a>

## _Video Demo 🎥_

<a href="https://www.youtube.com/watch?v=yJj5HEvEo5M" target="_blank">
  <img src="https://img.youtube.com/vi/yJj5HEvEo5M/0.jpg" alt="VetCare">
</a>

## _How to Use_

### Installation

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up your environment variables (e.g., database connection, Elasticemail credentials, etc.).
4. Run the application using `npm run start`.
   

### Installation with Docker

1. **Prerequisites**
   - Ensure that you have Docker installed on your system. If not, follow the official Docker installation guide for your operating system:
     - Install Docker on Linux
     - Install Docker on macOS
     - Install Docker on Windows

2. **Building and Running the Docker Container**
   - Open a terminal and navigate to the root directory of your project.
   - Start the container using Docker Compose:
     ```bash
     docker-compose up -d
     ```
   - Your Kryptonite App should now be have access to the postgres database running in the container.

3. **Stopping and Cleaning Up**
   - To stop the containers, run:
     ```bash
     docker-compose down
     ```
   - To remove the containers and associated volumes, use:
     ```bash
     docker-compose down -v
     ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
