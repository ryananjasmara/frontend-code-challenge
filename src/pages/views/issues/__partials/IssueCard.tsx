import { simpleDateFormat } from '@/shared/utils';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button } from '@/shared/components';
import './IssueCard.css';

interface Props {
  testId?: string;
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
          data-testid={`${props.testId}.issue-card-image`}
          src={props.imageUri}
          alt={props.title}
          className="issue-card-image"
        />
      </div>
      <div className="issue-card-content">
        <div>
          <h2
            className="issue-card-title"
            data-testid={`${props.testId}.issue-card-title`}
          >
            {props.title}
          </h2>
          <p
            className="issue-card-date"
            data-testid={`${props.testId}.issue-card-date`}
          >
            {simpleDateFormat(props.issueDate)}
          </p>
        </div>
        <div className="issue-card-buttons">
          <Button
            testId={`${props.testId}.issue-card-edit-button`}
            type="icon"
            icon={<PencilSquareIcon className="h-5 w-5" />}
            backgroundColor="blue"
            onClick={props.onEdit}
          />
          <Button
            testId={`${props.testId}.issue-card-remove-button`}
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
