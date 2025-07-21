type PageHeaderProps = {
    title: string;
};

export const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <hgroup className="prose mt-4 mb-6">
            <h1>{title}</h1>
        </hgroup>
    );
};
