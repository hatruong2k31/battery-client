import qs from "qs";
import { get } from "./request";

const roleSelect = async () => {
  let query = qs.stringify(
    {
      pagination: {
        pageSize: 1000,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const roleList = await get(`/api/role/list?${query}`);

  if (roleList.status === 200) {
    return { data: roleList.data.data };
  } else {
    return { data: [] };
  }
};

const profileSelect = async () => {
  let query = qs.stringify({
    encodeValuesOnly: true,
  });
  const profileList = await get(`/api/profile/list?${query}`);
  if (profileList.status === 200) {
    return { data: profileList.data.data };
  } else {
    return { data: [] };
  }
};

const selectEmployees = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        page: req.query.page || 1,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Employees",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

const selectGender = async () => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Gender",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    return { data: _re.data.data };
  } else {
    return { data: [] };
  }
};

const selectIndustry = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Industry",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

const selectLeadStatus = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Lead_Status",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

const selectLeadSource = async (req, res) => {
  const query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Lead_Source",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

const selectAccStatus = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Acc_Status",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

//chọn account
const selectAccount = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        // isPage: false,
        page: req.query.page || 1,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
      },
      sort: [{ column: "created_at", order: "desc" }],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/account/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
      pagination: {
        current: _re.data.paginate.currentPage,
        total: _re.data.paginate.totalPage,
      },
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

const selectOppStage = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Opp_Stage",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

const selectOppType = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Opp_type",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

const selectDecisionTimeframe = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Decision_Timeframe",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

const selectProductInterest = async (req, res) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        name: req.query.filters,
        is_delete: {
          $eq: false,
        },
        parent_code: {
          $eq: "Product_Interest",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/md/list?${query}`);
  if (_re.status === 200) {
    const result = {
      list: _re.data.data,
    };
    res.send(JSON.stringify(result));
  } else {
    res.send(JSON.stringify({ result: [] }));
  }
};

export {
  profileSelect,
  roleSelect,
  selectAccStatus,
  selectAccount,
  selectDecisionTimeframe,
  selectEmployees,
  selectGender,
  selectIndustry,
  selectLeadSource,
  selectLeadStatus,
  selectOppStage,
  selectOppType,
  selectProductInterest,
};
