import { simpleDateFormat } from '@/shared/utils';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button } from '@/shared/components';
import './IssueCard.css';

interface Props {
  issueNumber: number;
  title: string;
  issueDate: string;
  imageUri: string;
  onEdit: () => void;
  onRemove: () => void;
}

const IssueCard: React.FC<Props> = (props) => {
  return (
    <div className="issue-card">
      <div className="issue-card-issue-number">#{props.issueNumber}</div>
      <div className="issue-card-image-container">
        <img
          src={props.imageUri}
          alt={props.title}
          className="issue-card-image"
        />
      </div>
      <div className="issue-card-content">
        <div>
          <h2 className="issue-card-title">{props.title}</h2>
          <p className="issue-card-date">{simpleDateFormat(props.issueDate)}</p>
        </div>
        <div className="issue-card-buttons">
          <Button
            type="icon"
            icon={<PencilSquareIcon className="h-5 w-5" />}
            backgroundColor="blue"
            onClick={props.onEdit}
          />
          <Button
            type="icon"
            icon={<TrashIcon className="h-5 w-5" />}
            backgroundColor="red"
            onClick={props.onRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
