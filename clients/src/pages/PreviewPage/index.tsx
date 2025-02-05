import { TForm } from '@/types/forms';
import './styles/global.css';
import './styles/preflight.css';
import { Form } from './components/general/Form';
import { Headline } from './components/general/Headline';

interface PreviewPageProps {
    form: TForm;
    isBrandingEnabled: boolean;
    isRedirectDisabled: boolean;
    // onClose: () => void;
    getSetQuestionId: (setId: string) => void;
}

function PreviewPage({
    form,
    // isBrandingEnabled,
    // isRedirectDisabled,
    // onClose,
    // getSetQuestionId,
    getSetQuestionId,
}: PreviewPageProps) {
    
  return (
    <div 
        id='fbjs'
        className="fb-formbricks-form"
        style={{
            width: '100%',
            height: '100%',
        }}
    >
        <Form 
            form={form} 
            getSetQuestionId={getSetQuestionId}
        /> 
    </div>
  )
}

export default PreviewPage
