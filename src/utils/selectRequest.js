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
  console.log(profileList);
  if (profileList.status === 200) {
    return { data: profileList.data.data };
  } else {
    return { data: [] };
  }
};

const selectProvince = async () => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/local_province/list?${query}`);
  if (_re.data) {
    return { data: _re.data };
  } else {
    return { data: [] };
  }
};

const selectDistrict = async (province_id) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        province_id: {
          $eq: province_id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/local_district/list?${query}`);
  if (_re.data) {
    return { data: _re.data };
  } else {
    return { data: [] };
  }
};

const selectWard = async (district_id) => {
  let query = qs.stringify(
    {
      pagination: {
        isPage: false,
      },
      filters: {
        district_id: {
          $eq: district_id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const _re = await get(`/api/local_ward/list?${query}`);
  if (_re.data) {
    return { data: _re.data };
  } else {
    return { data: [] };
  }
};

const selectEmployees = async (res, req) => {
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
    return { data: _re.data.data };
  } else {
    return { data: [] };
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
    return { data: _re.data.data };
  } else {
    return { data: [] };
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
    return { data: _re.data.data };
  } else {
    return { data: [] };
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
    return { data: _re.data.data };
  } else {
    return { data: [] };
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
    return { data: _re.data.data };
  } else {
    return { data: [] };
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
    return { data: _re.data.data };
  } else {
    return { data: [] };
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
    return { data: _re.data.data };
  } else {
    return { data: [] };
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
    return { data: _re.data.data };
  } else {
    return { data: [] };
  }
};

export {
  profileSelect,
  roleSelect,
  selectProvince,
  selectDistrict,
  selectWard,
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
