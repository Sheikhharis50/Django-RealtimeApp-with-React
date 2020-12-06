from djongo import models
from django.contrib.auth.models import User
from django.db.models import Max
from bson.objectid import ObjectId


class Message(models.Model):
    id = models.IntegerField(
        primary_key=True, auto_created=True, unique=True
    )
    author = models.ForeignKey(
        to=User,
        related_name="author_messages",
        on_delete=models.CASCADE,
        null=True,
    )
    content = models.TextField()
    sent_date = models.DateTimeField(auto_now_add=True)
    objects = models.DjongoManager()

    def save(self, *args, **kwargs):
        if self._state.adding:
            last_id = Message.objects.aggregate(
                Max('id')
            )['id__max']
            if last_id is not None:
                self.id = last_id + 1
            else:
                self.id = 1
        super(Message, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.author.username)

    def last_messages(num_records):
        return Message.objects.order_by("-sent_date").all()[:num_records]
