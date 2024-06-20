<?php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User; // Asegúrate de importar la entidad User
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Doctrine\ORM\QueryBuilder;


    class UserController extends AbstractController
    {
    

        #[Route('/api/user', name: 'api_user')]
        public function index(Request $request, EntityManagerInterface $em)
        {
            $limit = $request->query->getInt('limit', 10); // Default limit
    $offset = $request->query->getInt('offset', 0); // Default offset
    $searchTerm = $request->query->get('search', ''); // Search term

    // Crear un QueryBuilder para la entidad User
    $qb = $em->getRepository(User::class)->createQueryBuilder('u')
        ->select('u.id', 'u.name', 'u.lastname', 'u.email', 'u.password')
        ->setFirstResult($offset)
        ->setMaxResults($limit);

    // Aplicar filtro de búsqueda si se proporciona un término de búsqueda
    if (!empty($searchTerm)) {
        $qb->where('u.name LIKE :searchTerm OR u.lastname LIKE :searchTerm OR u.email LIKE :searchTerm')
            ->setParameter('searchTerm', '%' . $searchTerm . '%');
    }

    // Obtener los resultados
    $users = $qb->getQuery()->getResult();

    // Obtener el total de usuarios sin aplicar limit y offset
    $totalUsers = $em->getRepository(User::class)->createQueryBuilder('u')
        ->select('count(u.id)')
        ->getQuery()
        ->getSingleScalarResult();

    return new JsonResponse([
        'data' => $users,
        'total' => $totalUsers,
        'limit' => $limit,
        'offset' => $offset,
    ]);
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

