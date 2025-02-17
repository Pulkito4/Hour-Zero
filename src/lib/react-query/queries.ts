import { useQuery } from '@tanstack/react-query'
import { getBranches, getSubjects, getDocumentsInSubjectSubCollection } from '@/firebase/firestore'

export function useBranches() {
  return useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranches(),
    staleTime: 1000 * 60 * 60 // 1 hour
  })
}

export function useSubjects(branch: string, semester: string) {
  return useQuery({
    queryKey: ['subjects', branch, semester],
    queryFn: () => getSubjects(branch, semester),
    enabled: !!branch && !!semester,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}

export function useSubjectDocuments<T extends 
  NotesDocument | 
  VideoDocument | 
  SyllabusDocument | 
  AssignmentDocument |
  PYQDocument |
  OthersDocument |
  LabDocument
>(
  branch: string | undefined, 
  semester: string | undefined,
  subjectId: string | undefined, 
  collection: string
) {
  return useQuery<T[]>({
    queryKey: ['documents', branch, semester, subjectId, collection],
    queryFn: async () => {
      if (!branch || !semester || !subjectId) {
        return [];
      }
      const rawDocs = await getDocumentsInSubjectSubCollection(
        branch,
        semester,
        subjectId,
        collection
      );
      
      return rawDocs.map(doc => ({
        id: doc.id,
        ...doc.data
      })) as T[];
    },
    enabled: !!branch && !!semester && !!subjectId,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}