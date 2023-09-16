import axios from "axios";
import { useAuthHeader, createRefresh } from "react-auth-kit";

// @ts-ignore
const refreshAuthLogic = createRefresh({
  interval: 0.15,
  refreshApiCallback: async ({ refreshToken,
authToken }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8008/users/token",
        {
          refreshToken: refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: data.token,
        newAuthTokenExpireIn: data.expiresIn,
      };
    } catch (error) {
      return { isSuccess: false };
    }
  },
  
});

export default refreshAuthLogic;
