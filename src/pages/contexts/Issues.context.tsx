import { IIssue } from '@/models/Issues';
import { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { IFilterData } from '@/pages/views/issues/__partials/FilterModal';

interface ModalDeleteDataProps {
    isOpen: boolean;
    issue: IIssue | null;
    onConfirm: () => void;
    title: string;
    description: string;
}

interface ModalFilterDataProps {
    isOpen: boolean;
    filterData: IFilterData;
}

interface IssuesStateContextProps {
    modalDeleteData: ModalDeleteDataProps;
    modalFilterData: ModalFilterDataProps;
}

interface IssuesEventContextProps {
    setModalDeleteData: Dispatch<SetStateAction<ModalDeleteDataProps>>;
    setModalFilterData: Dispatch<SetStateAction<ModalFilterDataProps>>;
    handleResetModalDeleteData: () => void;
    handleResetModalFilterData: () => void;
}

const modalDeleteDataInitialValue = {
  isOpen: false,
  issue: null,
  onCancel: () => { },
  onConfirm: () => { },
  title: '',
  description: '',
};

const modalFilterDataInitialValue = {
  isOpen: false,
  filterData: {
    sortBy: '',
    order: ''
  }
};

const IssuesStateContext = createContext<IssuesStateContextProps | undefined>(undefined);

const IssuesEventContext = createContext<IssuesEventContextProps | undefined>(
  undefined
);

const IssuesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalDeleteData, setModalDeleteData] = useState<ModalDeleteDataProps>(modalDeleteDataInitialValue);
  const [modalFilterData, setModalFilterData] = useState<ModalFilterDataProps>(modalFilterDataInitialValue);

  const handleResetModalDeleteData = () => {
    setModalDeleteData(modalDeleteDataInitialValue);
  };

  const handleResetModalFilterData = () => {
    setModalFilterData(modalFilterDataInitialValue);
  };

  return (
    <IssuesStateContext.Provider value={{ modalDeleteData, modalFilterData }}>
      <IssuesEventContext.Provider value={{ setModalDeleteData, setModalFilterData, handleResetModalDeleteData, handleResetModalFilterData }}>
        {children}
      </IssuesEventContext.Provider>
    </IssuesStateContext.Provider>
  );
};

const useIssuesContext = () => {
  const stateContext = useContext(IssuesStateContext);
  const eventContext = useContext(IssuesEventContext);

  if (!stateContext || !eventContext) {
    throw new Error('useIssuesContext must be used within a IssuesProvider');
  }

  return { stateContext, eventContext };
};

export { useIssuesContext };

export default IssuesProvider;
