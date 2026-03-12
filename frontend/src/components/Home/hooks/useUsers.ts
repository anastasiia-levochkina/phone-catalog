import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { User, CreateUserDto } from '@/types/api.types';

const USERS_QUERY_KEY = ['users'] as const;

export const useUsers = (enabled = true) => {
  return useQuery<User[]>({
    queryKey: USERS_QUERY_KEY,
    queryFn: () => apiClient.users.getAll(),
    enabled,
    staleTime: 30 * 1000,
    retry: 2,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CreateUserDto>({
    mutationFn: (data: CreateUserDto) => apiClient.users.create(data),
    onSuccess: () => {
      // Invalidate and refetch users after creating a new one
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });
};
