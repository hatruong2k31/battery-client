import axios from "axios";
import { APITOKEN, SERVER } from "../config";

const instance = axios.create({
  baseURL: SERVER.localhost,
});

export const postLogin = async (data) => {
  try {
    const _re = await instance.post("/api/auth/local", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!_re.data) {
      return { status: 400, error: _re.error };
    }
    return { status: 200, data: _re.data };
  } catch (error) {
    return { status: 400, error: error.response?.data?.error };
  }
};

export const postRegister = async (data) => {
  try {
    const _re = await instance.post("/api/auth/local/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!_re.data) {
      return { status: 400, error: _re.error };
    }
    return { status: 200, data: _re.data };
  } catch (error) {
    return { status: 400, error: error.response?.data?.error };
  }
};

export const postFogotPwd = async (data) => {
  try {
    const _re1 = await instance.post(`api/user/check-email/`, data, {
      headers: {
        Authorization: `Bearer ${APITOKEN.apiToken}`,
      },
    });
    if (_re1.data.data.ok === true) {
      const _re = await instance.post("api/auth/forgot-password", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (_re.data.ok === true) {
        return { status: 200, data: _re.data };
      }
      return { status: 400, message: "Email does not exist!" };
    } else {
      return { status: 400, message: "Email does not exist!" };
    }
  } catch (error) {
    return { status: 400, message: "error" };
  }
};

export const postResetPwd = async (data) => {
  try {
    const _re = await instance.post("api/auth/reset-password", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!_re.data) {
      return { status: 400, error: _re?.error };
    }
    //_re.data.jwt / _re.data.user
    return { status: 200, data: _re.data };
  } catch (error) {
    return { status: 400, error: error.response?.data?.error };
  }
};

export const postLoginGG = async (data) => {
  try {
    const _re = await instance.post("/api/auth/firebase", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!_re.data) {
      return { status: 400, error: _re.data.error };
    }

    return { status: 200, data: _re.data };
  } catch (error) {
    return { status: 400, error: error.response?.data?.error };
  }
};

export const getSignInGG = async (access_token) => {
  try {
    const _re = await instance.get(
      `/api/auth/google/callback?access_token=${access_token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!_re.data) {
      return { status: 400, error: _re.data.error };
    }

    return { status: 200, data: _re.data };
  } catch (error) {
    return { status: 400, error: error.response?.data?.error };
  }
};

export const postVerifyToken = async (data) => {
  try {
    const _re = await instance.post("/api/auth/verifyToken", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (_re.error) {
      return { status: 400, error: _re.error };
    }
    return { status: 200, data: _re.data };
  } catch (error) {
    return { status: 400, error: error.response?.data?.error };
  }
};

export const get = async (path) => {
  try {
    const _re = await instance.get(path, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    if (_re.error) {
      return { status: _re.error.status, message: _re.error.message };
    }
    if (_re.data.data) {
      return { status: 200, data: _re.data.data };
    } else {
      return { status: 200, data: _re.data };
    }
  } catch (error) {
    if (error.response.data?.error?.status === 401) {
      return { status: 401, message: error.response.data.error.message };
    } else {
      return {
        status: 500,
        details: error.response.statusText,
      };
    }
  }
};

export const post = async (path, data) => {
  try {
    const _re = await instance.post(path, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    return { status: 200, data: _re.data };
  } catch (error) {
    if (error.response.data.error.status === 401) {
      return { status: 401, message: error.response.data.error.details };
    }
    if (error.response.data.error.status === 400) {
      return {
        status: 400,
        details: error.response.data.error.name,
      };
    }
    if (error.response.data.error.status === 403) {
      return {
        status: 403,
        details: error.response.data.error.message,
      };
    }
    return {
      status: error.response.status || 500,
      details: error.response.statusText,
    };
  }
};

export const put = async (path, data) => {
  try {
    const _re = await instance.put(path, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    return { status: 200, data: _re.data };
  } catch (error) {
    if (error.response.data.error.status === 401) {
      return { status: 401, message: error.response.data.error.message };
    }

    if (error.response.data.error.status === 400) {
      if (error.response.data.error.name === "BadRequestError")
        return { status: 400, details: error.response.data.error.details };
      return {
        status: 400,
        details: error.response.data.error.name,
      };
    }
    if (error.response.data.error.status === 403) {
      return {
        status: 403,
        details: error.response.data.error.message,
      };
    }
    return {
      status: error.response.status || 500,
      details: error.response.statusText,
    };
  }
};

export const del = async (path) => {
  try {
    const _re = await instance.delete(path, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    return { status: 200, data: _re.data };
  } catch (error) {
    if (error.response.data?.error?.status === 401 || 400) {
      return { status: 401, message: error.response.data?.error?.details };
    } else {
      return {
        status: error.response?.status || 500,
        details: error.response?.statusText,
      };
    }
  }
};

export default instance;
