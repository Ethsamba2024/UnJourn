import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client/core';
import { client, exploreProfiles, getPublicationsQuery } from '../api';


interface PublicationData {
  publication: {
    __typename: string;
    id: string;
    metadata: {
      name: string;
      description: string;
      content: string;
      media: {
        original: {
          url: string;
          mimeType: string;
        };
      };
    };
    profile: {
      name: string;
      handle: string;
      picture: {
        original: {
          url: string;
        };
      };
    };
    stats: {
      totalAmountOfCollects: number;
      totalAmountOfComments: number;
    };
  };
}

const Publication: React.FC<{ publicationId: string }> = ({ publicationId }) => {
  const [publicationData, setPublicationData] = useState<PublicationData | null>(null);

  const { loading, error } = useQuery(gql`
    query Publication($publicationId: String!) {
      publication(request: { publicationId: $publicationId }) {
        __typename
        id
        metadata {
          name
          description
          content
          media {
            original {
              url
              mimeType
            }
          }
        }
        profile {
          name
          handle
          picture {
            original {
              url
            }
          }
        }
        stats {
          totalAmountOfCollects
          totalAmountOfComments
        }
      }
    }
  `, {
    variables: {
      publicationId,
    },
    onCompleted: (data) => setPublicationData(data),
  });

  if (loading) return <p>Carregando publicação...</p>;
  if (error) return <p>Erro ao carregar publicação: {error.message}</p>;

  const { publication } = publicationData!;

  return (
    <div className="publication">
      <div className="publication-header">
        <img
          className="publication-profile-picture"
          src={publication.profile.picture.original.url}
          alt={publication.profile.name}
        />
        <div className="publication-profile-info">
          <p className="publication-author">{publication.profile.name}</p>
          <p className="publication-handle">@{publication.profile.handle}</p>
        </div>
      </div>
      <div className="publication-content">
        {publication.__typename === 'Post' && (
          <div>
            <h3>{publication.metadata.name}</h3>
            <p>{publication.metadata.description}</p>
            {publication.metadata.media && (
              <img
                className="publication-media"
                src={publication.metadata.media.original.url}
                alt={publication.metadata.name}
              />
            )}
          </div>
        )}
        {publication.__typename === 'Comment' && (
          <div>
            <p>{publication.metadata.content}</p>
          </div>
        )}
        {publication.__typename === 'Mirror' && (
          <div>
            <p>Espelho de: {/* Extraia detalhes da publicação/comentário espelhado */}</p>
            <p>{publication.metadata.description}</p>
            {publication.metadata.media && (
              <img
                className="publication-media"
                src={publication.metadata.media.original.url}
                alt={publication.metadata.name}
              />
            )}
          </div>
        )}
      </div>
      <div className="publication-footer">
        <p>{publication.stats.totalAmountOfCollects} coletas</p>
        <p>{publication.stats.totalAmountOfComments} comentários</p>
      </div>
    </div>
  );
};

export default Publication;
