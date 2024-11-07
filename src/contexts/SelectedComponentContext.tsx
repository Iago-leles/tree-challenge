import { TreeNode } from "@/types";
import { createContext, useContext, useState } from "react";

type SelectedComponentContextType = {
  selectedComponent: TreeNode | null,
  setSelectedComponent: (node: TreeNode | null) => void
}

const SelectedComponentContext = createContext<SelectedComponentContextType | undefined>(undefined);

type SelectedComponentProviderProps = {
  children: React.ReactNode
}

export function SelectedComponentProvider({ children }: SelectedComponentProviderProps) {
  const [selectedComponent, setSelectedComponent] = useState<TreeNode | null>(null);

  return (
    <SelectedComponentContext.Provider value={{ selectedComponent, setSelectedComponent }}>
      {children}
    </SelectedComponentContext.Provider>
  )
}

export function useSelectedComponent() {
  const context = useContext(SelectedComponentContext);
  if (!context) {
    throw new Error('useSelectedComponent must be used within a SelectedComponentProvider');
  }

  return context;
}