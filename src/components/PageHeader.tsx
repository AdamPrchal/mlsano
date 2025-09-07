type PageHeaderProps = {
    title: string;
    children?: React.ReactNode;
};

export const PageHeader = ({ title, children }: PageHeaderProps) => {
    return (
        <hgroup className="prose mt-4 mb-6 flex justify-between">
            <h1>{title}</h1>
            {children && <div>{children}</div>}
        </hgroup>
    );
};
