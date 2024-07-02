# Vet-Care

## _Introduction_

Vet-Care is a veterinary clinic management system designed to handle staff, clients, pets, appointments, appointment notifications, and payments. The system follows clean architecture principles, ensuring clear separation of concerns and maintainability.

## _Video Demo 🎥_

<a href="https://www.youtube.com/watch?v=yJj5HEvEo5M" target="_blank">
  <img src="https://img.youtube.com/vi/yJj5HEvEo5M/0.jpg" alt="VetCare">
</a>

## _Technologies_

Expressjs - TypeScript - Postgres - Prisma - Joi - Jsonwebtoken - Swagger

## _Architecture Overview_

The second version of the API adheres to clean architecture principles. The application is structured into three distinct layers:

1. Presentation Layer
 - The presentation layer handles external communication with various systems, including APIs, UI components, and HTTP/S requests.
 - It acts as the entry point for external interactions and translates them into domain-specific use cases.
 - Examples of components in this layer include controllers, routes, and user interfaces.

2. Domain Layer
 - The domain layer encapsulates the core business rules, entities, data transfer objects (DTOs), validation logic, and use cases.
 - Entities represent the fundamental business concepts (e.g., staff, clients, pets) and contain the essential logic.
 - Use cases define how these entities interact and enforce business rules.
 - Validation rules are also part of this layer, ensuring data integrity.
 - DTOs facilitate data exchange between layers.
 - The domain layer remains independent of external concerns.

3. Infrastructure Layer
 - Infrastructure deals with external services and technical details.
 - It includes components responsible for database access, authentication, external  APIs, and other integrations.
 - The infrastructure layer interacts with databases (e.g., Postgres), third-party libraries (e.g., Prisma), and validation tools (e.g., Joi).
 - Keeping infrastructure separate from the domain ensures flexibility and testability.

Additionally:
 - The application follows the Vertical Slice technique, where each major feature or use case has its own dedicated folder structure.
 - Within each feature folder, you’ll find subfolders corresponding to the three layers (presentation, domain, and infrastructure).
 - Any shared code or utilities between different features reside at the root level within their respective layers.

This architecture promotes maintainability, scalability, and clear separation of concerns. 🏗️🚀

## _End points_

<a href="https://documenter.getpostman.com/view/29481678/2sA3dxCWit" target="_blank">
  Postman
</a>


## _How to Use_

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file and add your database and Cloudinary credentials.
4. Run the server using `npm run dev`.
5. Use Postman or any other API client to interact with the API endpoints.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
