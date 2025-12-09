import { useMemo } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import AlignLeft02Icon from 'src/icons/untitled-ui/duocolor/align-left-02';
import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile';
import BarChartSquare02Icon from 'src/icons/untitled-ui/duocolor/bar-chart-square-02';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import CreditCard01 from 'src/icons/untitled-ui/duocolor/credit-card-01';
import { paths } from 'src/paths';
import Calendar from 'src/icons/untitled-ui/duocolor/calendar';
import { AdminPanelSettingsOutlined, Person4TwoTone } from '@mui/icons-material';

export const useSections = () => {
  return useMemo(() => {
    return [
      {
        items: [
          {
            title: 'Dashboard',
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: 'Members',
            icon: (
              <SvgIcon fontSize="small">
                <Users03Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: 'All Members',
                path: paths.dashboard.members.index,
              },
              {
                title: 'Register Member',
                path: paths.dashboard.members.create,
              },
            ],
          },
          {
            title: 'Membership',
            path: paths.dashboard.membership.index,
            icon: (
              <SvgIcon fontSize="small">
                <BarChartSquare02Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: 'Create Package',
                path: paths.dashboard.membership.createPackage,
              },
              {
                title: 'All Packages',
                path: paths.dashboard.membership.allPackages,
              },
              {
                title: 'All Memberships',
                path: paths.dashboard.membership.allMembership,
              },
            ],
          },
          {
            title: 'Trainer',
            icon: (
              <SvgIcon fontSize="medium">
                <Person4TwoTone />
              </SvgIcon>
            ),
            items: [
              {
                title: 'All Trainers',
                path: paths.dashboard.trainer.index,
              },
              {
                title: 'Register Trainer',
                path: paths.dashboard.trainer.create,
              },
            ],
          },
          {
            title: 'Attendance',
            path: paths.dashboard.attendance.index,
            icon: (
              <SvgIcon fontSize="small">
                <Calendar />
              </SvgIcon>
            ),
          },
          {
            title: 'Invoice',
            path: paths.dashboard.invoices.index,
            icon: (
              <SvgIcon fontSize="small">
                <CreditCard01 />
              </SvgIcon>
            ),
          },
          {
            title: 'Adminstration',
            path: paths.dashboard.admin.index,
            icon: (
              <SvgIcon fontSize="medium">
                <AdminPanelSettingsOutlined />
              </SvgIcon>
            ),
            items: [
              {
                title: 'All Admins',
                path: paths.dashboard.admin.index,
              },
              {
                title: 'Create Admin',
                path: paths.dashboard.admin.create,
              },
              {
                title: 'Reports',
                path: paths.dashboard.reports.index,
              },
            ],
          },
          {
            title: 'Settings',
            path: paths.dashboard.setting.index,
            icon: (
              <SvgIcon fontSize="small">
                <AlignLeft02Icon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, []);
};
