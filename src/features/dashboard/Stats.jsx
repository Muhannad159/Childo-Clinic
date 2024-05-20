/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import {
//   HiOutlineBanknotes,
//   HiOutlineBriefcase,
//   HiOutlineCalendarDays,
//   HiOutlineChartBar,
// } from 'react-icons/hi2';
import Stat from './Stat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStethoscope,
  faUserDoctor,
  faUserNurse,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
function Stats({ cabins }) {
  // 1.
  const numStaff = cabins.data.length;
  const numDoctors = cabins.data.filter(
    (cabin) => cabin.role === 'DOCTOR'
  ).length;
  const numNurses = cabins.data.filter(
    (cabin) => cabin.role === 'NURSE'
  ).length;
  const numAdmins = cabins.data.filter(
    (cabin) => cabin.role === 'ADMIN'
  ).length;

  //2.

  // 3.

  // 4.
  return (
    <>
      <Stat
        title='Staff'
        color='blue'
        icon={<FontAwesomeIcon icon={faUser} />}
        value={numStaff}
      />
      <Stat
        title='Doctors'
        color='green'
        icon={<FontAwesomeIcon icon={faUserDoctor} />}
        value={numDoctors}
      />
      <Stat
        title='Nurses'
        color='indigo'
        icon={<FontAwesomeIcon icon={faUserNurse} />}
        value={numNurses}
      />
      <Stat
        title='Admins'
        color='yellow'
        icon={<FontAwesomeIcon icon={faUser} />}
        value={numAdmins}
      />
    </>
  );
}

export default Stats;
