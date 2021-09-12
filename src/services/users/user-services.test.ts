// import { createConnection, getConnection } from 'typeorm';

// import { CreateUsersService } from './CreateUsersService';
// import { AuthenticateUsersService } from './AuthenticateUsersService';

// beforeAll(async () => {
//   await createConnection(process.env.NODE_ENV).then(() => {
//     console.log('📦 Connected to test database.');
//   }).catch((error) => {
//     console.error(`Error connecting to database: ${error}`);
//   });
// });

// afterAll(async () => {
//   await getConnection(process.env.NODE_ENV).close().then(() => {
//     console.log('🚫 Disconnected to teste database.');
//   }).catch((error) => {
//     console.error(`Error disconnecting to database: ${error}`);
//   });
// });

// describe('CreateUsersService', () => {
//   it('should return error, "Name is required."',
//     async () => {
//       expect.assertions(1);
//       try {
//         const createUsersService = new CreateUsersService();

//         await createUsersService.execute({
//           name: '',
//           email: 'teste@hotmail.com',
//           password: '12345',
//         });
//       } catch (error) {
//         expect(error.message).toBe('Name is required.');
//       }
//     });

//   it('should return error, "E-mail incorrect.", if receive not e-mail',
//     async () => {
//       expect.assertions(1);
//       try {
//         const createUsersService = new CreateUsersService();

//         await createUsersService.execute({
//           name: 'Teste',
//           email: '',
//           password: '12345',
//         });
//       } catch (error) {
//         expect(error.message).toBe('E-mail incorrect.');
//       }
//     });

//   it('should return error, "E-mail incorrect.", if receive invalid e-mail',
//     async () => {
//       expect.assertions(1);
//       try {
//         const createUsersService = new CreateUsersService();

//         await createUsersService.execute({
//           name: 'Teste',
//           email: 'teste@hotmail' || 'testehotmail.com' || 'teste',
//           password: '12345',
//         });
//       } catch (error) {
//         expect(error.message).toBe('E-mail incorrect.');
//       }
//     });

//   it('should return error, "Password is required and greater than 5 characters.", if receive password less than 5 caracters',
//     async () => {
//       expect.assertions(1);
//       try {
//         const createUsersService = new CreateUsersService();

//         await createUsersService.execute({
//           name: 'Teste',
//           email: 'teste@hotmail.com',
//           password: '1234',
//         });
//       } catch (error) {
//         expect(error.message).toBe('Password is required and greater than 5 characters.');
//       }
//     });

//   it('should return error, "Password is required and greater than 5 characters.", if receive not password',
//     async () => {
//       expect.assertions(1);
//       try {
//         const createUsersService = new CreateUsersService();

//         await createUsersService.execute({
//           name: 'Teste',
//           email: 'teste@hotmail.com',
//           password: '',
//         });
//       } catch (error) {
//         expect(error.message).toBe('Password is required and greater than 5 characters.');
//       }
//     });

//   it('should create new user and return JWT token',
//     async () => {
//       expect.assertions(1);
//       try {
//         const createUsersService = new CreateUsersService();
//         const result = await createUsersService.execute({
//           name: 'Teste',
//           email: 'teste@hotmail.com',
//           password: '12345',
//         });

//         expect(typeof result.token).toBe('string');
//       } catch (error) {
//         console.error(error);
//       }
//     });

//   it('should return error, "User already exists."',
//     async () => {
//       expect.assertions(1);
//       try {
//         const createUsersService = new CreateUsersService();

//         await createUsersService.execute({
//           name: 'Teste',
//           email: 'teste@hotmail.com',
//           password: '12345',
//         });
//       } catch (error) {
//         expect(error.message).toBe('User already exists.');
//       }
//     });
// });

// describe('AuthenticateUsersService', () => {
//   it('should return error, "E-mail or password is required.", if not e-mail',
//     async () => {
//       expect.assertions(1);
//       try {
//         const authenticateUsersService = new AuthenticateUsersService();

//         await authenticateUsersService.execute({
//           email: '',
//           password: '12345',
//         });
//       } catch (error) {
//         expect(error.message).toBe('E-mail or password is required.');
//       }
//     });

//   it('should return error, "E-mail or password is required.", if not password',
//     async () => {
//       expect.assertions(1);
//       try {
//         const authenticateUsersService = new AuthenticateUsersService();

//         await authenticateUsersService.execute({
//           email: 'teste@hotmail.com',
//           password: '',
//         });
//       } catch (error) {
//         expect(error.message).toBe('E-mail or password is required.');
//       }
//     });

//   it('should return error, "E-mail or password is incorrect.", if not find user',
//     async () => {
//       expect.assertions(1);
//       try {
//         const authenticateUsersService = new AuthenticateUsersService();

//         await authenticateUsersService.execute({
//           email: 'teste1@hotmail.com',
//           password: '12345',
//         });
//       } catch (error) {
//         expect(error.message).toBe('E-mail or password is incorrect.');
//       }
//     });

//   it('should return error, "E-mail or password is incorrect.", if invalid password',
//     async () => {
//       expect.assertions(1);
//       try {
//         const authenticateUsersService = new AuthenticateUsersService();

//         await authenticateUsersService.execute({
//           email: 'teste@hotmail.com',
//           password: '123456',
//         });
//       } catch (error) {
//         expect(error.message).toBe('E-mail or password is incorrect.');
//       }
//     });
// });
