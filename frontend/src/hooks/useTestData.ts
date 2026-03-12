import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { TestData } from '@/types/api.types';

export const useTestData = () => {
  return useQuery<TestData>({
    queryKey: ['test'],
    queryFn: () => apiClient.test.getTestData(),
    staleTime: 60 * 1000,
    retry: 2,
  });
};
