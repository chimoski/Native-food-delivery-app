import { createContext, useState } from "react";

export const MountContext = createContext(null);

const MountProvider = ({ children }) => {
	const [isMount, setIsMount] = useState(false);
	return (
		<MountContext.Provider value={{ isMount, setIsMount }}>
			{children}
		</MountContext.Provider>
	);
};

export default MountProvider;
