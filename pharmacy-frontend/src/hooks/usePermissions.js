// src/hooks/usePermissions.js
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export function usePermissions(userId) {
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPermissions = async () => {
      try {
        // 1. Get user document
        const userDoc = await getDoc(doc(db, "users", userId));
        if (!userDoc.exists()) {
          console.warn("User not found in Firestore");
          setLoading(false);
          return;
        }

        const userData = userDoc.data();
        setRole(userData.role || "");

        // 2. Get permissions from roles_permissions/config
        const configDoc = await getDoc(doc(db, "roles_permissions", "config"));
        if (configDoc.exists()) {
          const configData = configDoc.data();
          setPermissions(configData.rolePermissions?.[userData.role] || []);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [userId]);

  return { role, permissions, loading };
}
