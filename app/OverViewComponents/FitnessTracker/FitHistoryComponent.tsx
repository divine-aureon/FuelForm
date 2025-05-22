'use client';
import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import type { UserProfile } from "../../initializing/Global/BodySyncManifest"

import React from "react";
import { useEffect, useState } from 'react';
import useAuth from '@/lib/useAuth';
import { db } from '@/lib/firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import ScrollLoad from "@/Backgrounds/ScrollLoad"


export default function FitHistoryComponent() {

    //USER PROFILE INFO
    const { user } = useAuth();

         const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE


    return (
        <>
            <ScrollLoad />


        </>
    );
}