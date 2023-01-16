// import { housingRoute } from '@/modules/housing/config'
// import { selectRole } from '@/store/account/selectors'

import { message } from "antd";
import _ from "lodash";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserRole } from "../../typing/enums";

export const useGuard = (roles: UserRole[]) => {
  // const role = useSelector(selectRole)
  // const history = useHistory()

  useEffect(() => {
    // console.log(role, roles)
    // if (role && !_.isEmpty(roles) && !roles.includes(role)) {
    //   history.push(housingRoute)
    //   message.error('You do not have access to this page')
    // }
  });
};
