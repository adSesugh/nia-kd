import { Metadata } from 'next';
import React from 'react'
import DashboardView from '.';

export const metadata: Metadata = {
  title: "Dashboard | NIA-Kd",
  description: "NIA-Kd Home",
};

const Dashboard = () => {
  return <DashboardView />
}

export default Dashboard