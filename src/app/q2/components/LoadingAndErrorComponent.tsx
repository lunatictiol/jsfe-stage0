"use client";

import React from "react";

type StatusProps = {
    loading: boolean;
    error: string | null;
};

export function LoadingAndErrorComponent<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return function ComponentWithStatus(props: P & StatusProps) {
        const { loading, error, ...rest } = props;

        if (loading) {
            return <p className="text-gray-500">Loading...</p>;
        }

        if (error) {
            return <p className="text-red-500">Error: {error}</p>;
        }

        return <WrappedComponent {...(rest as P)} />;
    };
}
