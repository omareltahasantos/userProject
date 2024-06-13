<?php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User; // Asegúrate de importar la entidad User
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('api/user', name: 'app_user')]

    public function getUsers(EntityManagerInterface $em){
        // Configurar las cabeceras CORS para permitir solicitudes desde http://localhost:3000
        $users = $em->getRepository(User::class)->createQueryBuilder('u')
        -> select('u.id','u.name','u.lastname','u.email','u.password')
        -> getQuery()
        -> getResult();
    $data = [];

    

    
    // Devolver la respuesta
    return new JsonResponse($users);
    }

    #[Route('/api/users/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function deleteUser(User $user, EntityManagerInterface $entityManager): JsonResponse
    {
        // Comprueba si el usuario existe
        if (!$user) {
            return new JsonResponse(['error' => 'El usuario no existe.'], Response::HTTP_NOT_FOUND);
        }

        // Elimina el usuario de la base de datos
        $entityManager->remove($user);
        $entityManager->flush();

        // Devuelve una respuesta exitosa
        return new JsonResponse(['message' => 'Usuario eliminado correctamente.'], Response::HTTP_OK);
    }

    #[Route('api/users', name: 'create_user')]
    public function createUser(Request $request, EntityManagerInterface $entityManager)
    {
        

        

        $user = new User();
        $user->setName($request->get('name'));
        $user->setLastname($request->get('lastname'));
        $user->setEmail($request->get('email'));
        $user->setPassword($request->get('password'));

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Usuario creado correctamente.']);
    }

    #[Route('api/users/{id}', name: 'update_user')]
    public function updateUser($id, Request $request, EntityManagerInterface $entityManager)
    {
        $user = $entityManager->getRepository(User::class)->find($id);
        
        if (!$user) {
            return new JsonResponse(['error' => 'El usuario no existe.'], Response::HTTP_NOT_FOUND);
        }

        $requestData = json_decode($request->getContent(), true);

        if (isset($requestData['name'])) {
            $user->setName($requestData['name']);
        }
        if (isset($requestData['lastname'])) {
            $user->setLastname($requestData['lastname']);
        }
        if (isset($requestData['email'])) {
            $user->setEmail($requestData['email']);
        }
        if (isset($requestData['password'])) {
            $user->setPassword($requestData['password']);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Usuario actualizado correctamente.']);
    }
    }

