import { createContext, ReactNode, useContext, useState } from "react";
import Icon from "../Icon";
import PopupWindow from "../PopupWindow";

interface GetterSetter<T> {
  get: () => T;
  set: (value: T) => void;
}

interface ModalData {
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

interface ModalColorSet {
  accent: string;
  background: string;
}

interface Context {
  data: GetterSetter<ModalData>;
  colors: GetterSetter<ModalColorSet>;
  visible: GetterSetter<boolean>;
  show: (data: ModalData, colors: ModalColorSet) => void;
}

function makeGetter<T>(value: T) {
  return () => value;
}

const ModalsContext = createContext<Context>(null as any);

export default function AppWrapper({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState<ModalData>({
    title: "Unknown Modal",
    icon: <></>,
    content: <></>,
  });

  const [modalColorSet, setModalColorSet] = useState<ModalColorSet>({
    accent: "#fff",
    background: "#333",
  });

  const sharedState: Context = {
    data: {
      get: makeGetter<ModalData>(modalData),
      set: setModalData,
    },
    colors: {
      get: makeGetter<ModalColorSet>(modalColorSet),
      set: setModalColorSet,
    },
    visible: {
      get: makeGetter<boolean>(showModal),
      set: setShowModal,
    },
    show(data, colors) {
      setModalData(data);
      setModalColorSet(colors);
      setShowModal(true);
    },
  };

  return (
    <ModalsContext.Provider value={sharedState}>
      <PopupWindow
        title={modalData.title}
        icon={modalData.icon}
        colors={modalColorSet}
        visible={showModal}
        handleClose={() => setShowModal(false)}
        id={`window-popup`}
      >
        {modalData.content}
      </PopupWindow>
      {children}
    </ModalsContext.Provider>
  );
}

export function useModalsContext() {
  return useContext<Context>(ModalsContext);
}
