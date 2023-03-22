import qs from "qs";
import { get } from "./request";

const roleSelect = async () => {
  const roleList = await get(`/api/users-permissions/roles?`);
  console.log(roleList);
  if (roleList.status === 200) {
    return { data: roleList.data.roles };
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

export { roleSelect, selectProvince, selectDistrict, selectWard };
