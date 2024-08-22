interface Props {
  title: string;
}

export const EmptyData: React.FC<Props> = (props) => (
    <div className="flex items-center justify-center h-full w-full">
      <p className="text-gray-500">{props.title}</p>
    </div>
  );