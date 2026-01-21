import React, { Suspense } from 'react'

const testTopicPage = ({ params }: { params: { subjectNameN: string } }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        
        
    </Suspense>
  );
}

export default testTopicPage