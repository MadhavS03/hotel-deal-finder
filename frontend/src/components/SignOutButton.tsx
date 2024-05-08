import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-orange-500 px-3 py-1 rounded text-lg font-bold bg-white hover:bg-orange-600 hover:text-white" 
      // text-orange-500 bg-white px-3 py-2.5 pb-2.5 font-bold hover:bg-orange-600 hover:text-white
      style={{
        fontFamily: "'Inter', sans-serif",
                transition: "all 0.3s",
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
