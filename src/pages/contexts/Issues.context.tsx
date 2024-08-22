import { IIssue } from '@/models/Issues';
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction
} from 'react';
import { IFilterData } from '@/pages/views/issues/__partials/FilterModal';

interface ModalDeleteDataProps {
  isOpen: boolean;
  issue: IIssue | null;
}

interface ModalFilterDataProps {
  isOpen: boolean;
  filterData: IFilterData;
}

interface ModalCreateDataProps {
  isOpen: boolean;
}

interface ModalEditDataProps {
  isOpen: boolean;
  issueId: string;
}

interface IssuesStateContextProps {
  modalDeleteData: ModalDeleteDataProps;
  modalFilterData: ModalFilterDataProps;
  modalCreateData: ModalCreateDataProps;
  modalEditData: ModalEditDataProps;
}

interface IssuesEventContextProps {
  setModalDeleteData: Dispatch<SetStateAction<ModalDeleteDataProps>>;
  setModalFilterData: Dispatch<SetStateAction<ModalFilterDataProps>>;
  setModalCreateData: Dispatch<SetStateAction<ModalCreateDataProps>>;
  setModalEditData: Dispatch<SetStateAction<ModalEditDataProps>>;
  handleResetModalDeleteData: () => void;
  handleResetModalFilterData: () => void;
  handleResetModalCreateData: () => void;
  handleResetModalEditData: () => void;
}

const modalDeleteDataInitialValue: ModalDeleteDataProps = {
  isOpen: false,
  issue: null
};

const modalFilterDataInitialValue: ModalFilterDataProps = {
  isOpen: false,
  filterData: {
    sortBy: '',
    order: ''
  }
};

const modalCreateDataInitialValue: ModalCreateDataProps = {
  isOpen: false
};

const modalEditDataInitialValue: ModalEditDataProps = {
  isOpen: false,
  issueId: ''
};

const IssuesStateContext = createContext<IssuesStateContextProps | undefined>(
  undefined
);

const IssuesEventContext = createContext<IssuesEventContextProps | undefined>(
  undefined
);

const IssuesProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [modalDeleteData, setModalDeleteData] = useState<ModalDeleteDataProps>(
    modalDeleteDataInitialValue
  );
  const [modalFilterData, setModalFilterData] = useState<ModalFilterDataProps>(
    modalFilterDataInitialValue
  );
  const [modalCreateData, setModalCreateData] = useState<ModalCreateDataProps>(
    modalCreateDataInitialValue
  );
  const [modalEditData, setModalEditData] = useState<ModalEditDataProps>(
    modalEditDataInitialValue
  );

  const handleResetModalDeleteData = () => {
    setModalDeleteData(modalDeleteDataInitialValue);
  };

  const handleResetModalFilterData = () => {
    setModalFilterData(modalFilterDataInitialValue);
  };

  const handleResetModalCreateData = () => {
    setModalCreateData(modalCreateDataInitialValue);
  };

  const handleResetModalEditData = () => {
    setModalEditData(modalEditDataInitialValue);
  };

  return (
    <IssuesStateContext.Provider
      value={{
        modalDeleteData,
        modalFilterData,
        modalCreateData,
        modalEditData
      }}
    >
      <IssuesEventContext.Provider
        value={{
          setModalDeleteData,
          setModalFilterData,
          setModalCreateData,
          setModalEditData,
          handleResetModalDeleteData,
          handleResetModalFilterData,
          handleResetModalCreateData,
          handleResetModalEditData
        }}
      >
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
